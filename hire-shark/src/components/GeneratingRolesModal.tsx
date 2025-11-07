import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface GeneratingRolesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GeneratingRolesModal = ({ isOpen, onClose }: GeneratingRolesModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Finding Your Perfect Fit</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
        <div className="text-center text-muted-foreground">
          <p>Analyzing your skills and experience...</p>
          <p>This won't take long.</p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};