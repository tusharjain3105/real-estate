import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Form } from "@/components/Form";
  import { Button } from "@/components/ui/button";
export const PopForm = ({property}) => {
    return (
        <Dialog >
            <DialogTrigger><Button  variant="orange" className="uppercase mt-2">
              Contact
            </Button></DialogTrigger>
        <DialogContent className="w-86">
              <Form property={property}/>
        </DialogContent>
      </Dialog>
  )
}
