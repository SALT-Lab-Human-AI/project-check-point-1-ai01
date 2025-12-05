# Test Cases Documentation

This document describes the minimal test cases implemented in HireShark to ensure core functionality works correctly.

## Overview

HireShark includes three test suites covering the main features:
1. **Matching Algorithm Tests** (`src/lib/__tests__/matcher.test.ts`)
2. **Resume Parser Tests** (`src/lib/__tests__/gemini_parser.test.ts`)
3. **Context Integration Tests** (`src/store/__tests__/resume_context.test.tsx`)

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run a specific test file
npx vitest src/lib/__tests__/matcher.test.ts

# Run tests with coverage
npx vitest --coverage
```

## Test Suites

### 1. Matching Algorithm Tests (matcher.test.ts)

**Purpose**: Validates the hybrid matching algorithm that combines skill overlap scoring with vector similarity (TF-IDF or Skip-gram).

**Location**: `src/lib/__tests__/matcher.test.ts`

#### Test Cases

##### 1.1 Returns matches sorted by score desc and computes score correctly
- **What it tests**: The matching algorithm correctly ranks jobs based on skill overlap and vector similarity
- **Setup**:
  - 3 job postings: Frontend (React, TypeScript, CSS), Backend (Node.js, Express, MongoDB), Full Stack (React, Node.js, TypeScript, AWS)
  - Resume with skills: React, TypeScript, CSS
- **Expected behavior**:
  - Frontend job ranks first (100% skill match)
  - Full Stack ranks second (75% skill match)
  - Scores are normalized between 0 and 1
- **Key assertion**: `expect(matches[0].title).toBe("Frontend")`

##### 1.2 Respects limit parameter
- **What it tests**: The `getMatches` function honors the limit parameter
- **Setup**: Same as above with limit=1
- **Expected behavior**: Only 1 match returned
- **Key assertion**: `expect(matches.length).toBe(1)`

##### 1.3 Returns empty array when no skills overlap
- **What it tests**: The algorithm handles cases with zero skill overlap gracefully
- **Setup**: Resume with Go and Rust skills (no matches with job postings)
- **Expected behavior**:
  - Returns an array (possibly empty or with low-scoring matches)
  - Vector similarity may still return results based on textual similarity
  - All scores are between 0 and 1
- **Key assertion**: `expect(Array.isArray(matches)).toBe(true)`

**Technical Details**:
- Uses hybrid scoring: 80% vector similarity + 20% skill overlap
- Supports both Skip-gram (TensorFlow.js) and TF-IDF fallback
- Tests run in jsdom environment (simulates browser)

---

### 2. Resume Parser Tests (gemini_parser.test.ts)

**Purpose**: Validates that the Gemini API integration correctly handles different response formats and extracts resume data.

**Location**: `src/lib/__tests__/gemini_parser.test.ts`

#### Test Cases

##### 2.1 Strips code-fences and parses object when model returns fenced json
- **What it tests**: Parser handles markdown-fenced JSON responses from Gemini
- **Setup**: Mock Gemini response with triple backticks:
  ```
  ```json
  {
    "skills": ["TS", "React"]
  }
  ```
  ```
- **Expected behavior**:
  - Strips markdown code fences
  - Parses JSON correctly
  - Returns skills array: `["TS", "React"]`
  - Sets fileName to uploaded file name
- **Key assertion**: `expect(result.skills).toEqual(["TS", "React"])`

##### 2.2 Parses correctly when model returns plain JSON string
- **What it tests**: Parser handles plain JSON responses without fences
- **Setup**: Mock Gemini response: `{"skills":["Go","K8s"]}`
- **Expected behavior**:
  - Parses JSON directly
  - Returns skills array: `["Go", "K8s"]`
  - Sets correct fileName
- **Key assertion**: `expect(result.skills).toEqual(["Go", "K8s"])`

**Technical Details**:
- Mocks `@google/generative-ai` module to avoid real API calls
- Tests run without requiring actual Gemini API key
- Validates JSON cleaning logic (removing code fences)
- Tests the `parseResumeWithGemini` function end-to-end

**Mock Implementation**:
```typescript
// Mock setup creates a fake GoogleGenerativeAI client
const mockClient = {
  getGenerativeModel: vi.fn(),
};

vi.mock("@google/generative-ai", () => ({
  GoogleGenerativeAI: vi.fn(function() { return mockClient; }),
}));
```

---

### 3. Context Integration Tests (resume_context.test.tsx)

**Purpose**: Validates the React Context state management for resume upload, parsing, and matching workflows.

**Location**: `src/store/__tests__/resume_context.test.tsx`

#### Test Suite 1: Upload → Parse (Resume)

##### 3.1 uploadFile sets resume with id, file, and uploadedAt
- **What it tests**: File upload initializes resume state correctly
- **Setup**: Create a File object and upload it
- **Expected behavior**:
  - Resume ID is set to "1"
  - File reference is stored
  - uploadedAt timestamp is created
- **Key assertion**: `expect(state.resume?.id).toBe("1")`

##### 3.2 parseResume toggles isParsing true→false and sets resume.parsed on success
- **What it tests**: Async parsing flow with loading states
- **Setup**:
  - Upload a file
  - Mock `parseResumeWithGemini` to return parsed data
  - Start parsing
- **Expected behavior**:
  - `isParsing` flag toggles true during parsing
  - `isParsing` returns to false after completion
  - `resume.parsed` is populated with parsed data
- **Key assertion**: `expect(state.resume?.parsed).toEqual(parsed)`

##### 3.3 parseResume no-ops safely when resume.file is missing
- **What it tests**: Graceful handling of edge case
- **Setup**: Call parseResume without uploading a file first
- **Expected behavior**:
  - No error thrown
  - `parseResumeWithGemini` is not called
  - State remains unchanged
- **Key assertion**: `expect(spy).not.toHaveBeenCalled()`

##### 3.4 parseResume propagates failures and resets isParsing to false on error
- **What it tests**: Error handling in parsing flow
- **Setup**: Mock `parseResumeWithGemini` to reject
- **Expected behavior**:
  - Error is propagated (promise rejects)
  - `isParsing` is reset to false
  - `resume.parsed` remains undefined
- **Key assertion**: `expect(state.isParsing).toBe(false)`

#### Test Suite 2: Generate Roles & Locations

##### 3.5 updates generatedJobRoles and generatedLocations; handles code-fenced JSON
- **What it tests**: AI-powered job role generation from resume
- **Setup**:
  - Mock Gemini to return roles: `["Role A", "Role B"]`
  - Mock Gemini to return locations: `["City X", "City Y"]`
  - Call `generateJobRolesFromEditedResume`
- **Expected behavior**:
  - `generatedJobRoles` is updated with role suggestions
  - `generatedLocations` is updated with location suggestions (if implemented)
  - Handles code-fenced JSON responses
- **Key assertion**: `expect(state.generatedJobRoles).toEqual(["Role A", "Role B"])`

**Note**: The current implementation generates job roles but may not generate locations. The test validates the role generation workflow.

#### Test Suite 3: Run Matching (Context Integration)

##### 3.6 with parsed resume, sets isMatching true→false and populates matches
- **What it tests**: End-to-end matching workflow
- **Setup**:
  - Upload and parse a resume
  - Mock `matchJobs` to return fake matches
  - Run matching
- **Expected behavior**:
  - `isMatching` toggles true during matching
  - `isMatching` returns to false after completion
  - `matches` array is populated
- **Key assertion**: `expect(state.matches).toEqual(fakeMatches)`

##### 3.7 accepts an override resume and persists it before matching
- **What it tests**: Matching with edited/override resume data
- **Setup**:
  - Create override resume with Vue skills
  - Call `runMatching(override)`
- **Expected behavior**:
  - Override resume replaces current resume
  - Matching uses override data
  - Results reflect override skills
- **Key assertion**: `expect(get().resume?.parsed?.skills).toEqual(["Vue"])`

##### 3.8 safe early-return when resume.parsed is missing
- **What it tests**: Defensive programming for missing data
- **Setup**: Call `runMatching` without parsed resume
- **Expected behavior**:
  - No error thrown
  - `matchJobs` is not called
  - `matches` remains empty
- **Key assertion**: `expect(spy).not.toHaveBeenCalled()`

---

## Test Architecture

### Testing Stack
- **Test Runner**: Vitest (Vite-native test framework)
- **React Testing**: @testing-library/react
- **Environment**: jsdom (browser simulation)
- **Mocking**: Vitest's built-in `vi` mock utilities

### Key Testing Patterns

#### 1. Mocking External APIs
```typescript
// Mock Gemini API
vi.mock("@google/generative-ai", () => ({
  GoogleGenerativeAI: vi.fn(function() { return mockClient; }),
}));
```

#### 2. Testing Async State Updates
```typescript
await act(async () => {
  await get().parseResume();
});
```

#### 3. React Context Testing
```typescript
// Harness to access context imperatively
const Grabber: React.FC = () => {
  const value = useResume();
  ctx = value;
  return <div data-testid="probe" />;
};
```

### Dependencies

The tests require the following packages:
- `vitest` - Test runner
- `@testing-library/react` - React component testing utilities
- `jsdom` - Browser environment simulation
- `@tensorflow/tfjs` - For Skip-gram vectorization (optional fallback to TF-IDF)

---

## Coverage Metrics

Current test coverage:
- **Test Files**: 3/3 (100%)
- **Total Tests**: 13 passed
- **Core Modules Covered**:
  - ✅ Matching algorithm (`matcher.ts`)
  - ✅ Resume parsing (`gemini_parser.ts`)
  - ✅ Context state management (`ResumeContext.tsx`)

### What's Tested
- ✅ Skill-based matching and scoring
- ✅ Vector similarity (TF-IDF/Skip-gram)
- ✅ JSON parsing and cleaning
- ✅ File upload workflow
- ✅ Async state management
- ✅ Error handling
- ✅ Edge cases (missing data, empty results)

### What's Not Tested (Future Work)
- ⚠️ UI components (pages, forms)
- ⚠️ Adzuna API integration
- ⚠️ End-to-end user flows
- ⚠️ Secret vault and encryption
- ⚠️ Preferences context

---

## Debugging Tests

### Common Issues

#### Issue: TensorFlow.js WebGL errors in tests
```
Error: WebGL is not supported on this device
```
**Solution**: Tests automatically fall back to CPU backend. This warning can be ignored.

#### Issue: Mock not working
```
Error: Gemini API key is required to continue
```
**Solution**: Ensure mocks are set up before imports:
```typescript
vi.mock("@google/generative-ai", () => ({ ... }));
import { parseResumeWithGemini } from "...";
```

#### Issue: State not updating in tests
**Solution**: Wrap state updates in `act()`:
```typescript
await act(async () => {
  await get().parseResume();
});
```

### Debug Commands

```bash
# Run tests with verbose output
npx vitest --reporter=verbose

# Run specific test by name
npx vitest -t "returns matches sorted"

# Debug a single test file
npx vitest src/lib/__tests__/matcher.test.ts --reporter=verbose
```

---

## Related Documentation

- **Architecture**: `docs/architecture.mmd` - System architecture diagram
- **Code Flow**: `docs/code-flow.md` - Detailed code flow explanations
- **Observability**: `docs/observability.md` - Logging and monitoring
- **Telemetry**: `telemetry/README.md` - Debugging test cases

---

## Contributing

When adding new features, ensure you:
1. Write corresponding test cases
2. Mock external APIs (Gemini, Adzuna)
3. Test both success and failure paths
4. Verify error handling
5. Run full test suite before committing

```bash
# Before committing
npm test
npm run build
```
