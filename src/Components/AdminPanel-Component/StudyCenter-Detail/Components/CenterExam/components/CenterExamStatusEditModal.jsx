import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Select,
    Option,
} from "@material-tailwind/react";
import { useState } from "react";
import { $api } from "../../../../../../utils";
import { Alert } from "../../../../../../utils/Alert";

export default function CenterExamStatusEditModal({ type, examId, refresh, Examstatus }) {
    const [status, setStatus] = useState(Examstatus || "active");
    const [keyPrice, setKeyPrice] = useState("");
    const [isOpen, setOpen] = useState(false);

    const handleSave = async () => {
        try {
            const Data = {
                exam_id: examId,
                status: status,
                key_price: keyPrice,
            }
            const response = await $api.patch(`/admin/change-exam-status`, Data)
            Alert("Muvaffaqiyatli", "success");
            refresh()
            setOpen(false);
        } catch (error) {
            console.log(error);
            Alert(`Xatolik: ${error.message}`, "error");
        }
    };

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                variant="gradient"
                color="blue"
                className="mt-[10px]"
            >
                Statusni o'zgartirish
            </Button>

            <Dialog open={isOpen} handler={() => setOpen(false)} size="sm">
                <DialogHeader>Imtihon statusini o'zgartirish</DialogHeader>
                <DialogBody className="flex flex-col gap-4">
                    <Select
                        label="Statusni tanlang"
                        value={status}
                        onChange={(val) => setStatus(val)}
                    >
                        <Option value="active">Faol</Option>
                        <Option value="inactive">Nofaol</Option>
                    </Select>

                    {type == 3 && (
                        <Input
                            label="Kalit narxi"
                            type="number"
                            value={keyPrice}
                            onChange={(e) => setKeyPrice(e.target.value)}
                        />
                    )}
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="gray"
                        onClick={() => setOpen(false)}
                        className="mr-2"
                    >
                        Bekor qilish
                    </Button>
                    <Button variant="gradient" color="blue" onClick={handleSave}>
                        Saqlash
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
