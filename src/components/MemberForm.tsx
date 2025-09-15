import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MemberSchema, type Member } from "../types/member";

type Props = {
  onSubmit: (data: Member) => void;
  defaultValues?: Member;
  editingIndex?: number | null;
};

export default function MemberForm({ onSubmit, defaultValues, editingIndex }: Props) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Member>({
    resolver: zodResolver(MemberSchema),
    defaultValues: defaultValues || {
      prefix: "", firstName: "", lastName: "", workHistory: "", achievements: "",
      minister: "", ministry: "", party: "", photo: undefined,
    },
  });

  const submitHandler = (data: Member) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      <h2 className="text-xl font-bold text-center mb-4">
        {editingIndex !== null ? "แก้ไขสมาชิก" : "เพิ่มสมาชิกใหม่"}
      </h2>

      <select {...register("prefix")} className="w-full border p-2 rounded">
        <option value="">เลือกคำนำหน้า</option>
        <option value="นาย">นาย</option>
        <option value="นาง">นาง</option>
        <option value="นางสาว">นางสาว</option>
      </select>
      {errors.prefix && <p className="text-red-500 text-sm">{errors.prefix.message}</p>}

      <div className="flex gap-4">
        <input placeholder="ชื่อ" {...register("firstName")} className="flex-1 border p-2 rounded" />
        <input placeholder="นามสกุล" {...register("lastName")} className="flex-1 border p-2 rounded" />
      </div>
      {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
      {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}

      <input placeholder="พรรคการเมือง" {...register("party")} className="w-full border p-2 rounded" />
      {errors.party && <p className="text-red-500 text-sm">{errors.party.message}</p>}

      <textarea placeholder="ประวัติการทำงาน" {...register("workHistory")} className="w-full border p-2 rounded" />
      <textarea placeholder="ผลงานที่ผ่านมา" {...register("achievements")} className="w-full border p-2 rounded" />

      <div className="flex gap-4">
        <input placeholder="ตำแหน่งรัฐมนตรี" {...register("minister")} className="flex-1 border p-2 rounded" />
        <input placeholder="กระทรวง" {...register("ministry")} className="flex-1 border p-2 rounded" />
      </div>

      <input type="file" accept="image/*" {...register("photo")} className="w-full" />

      <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
        {editingIndex !== null ? "อัปเดต" : "เพิ่ม"}
      </button>
    </form>
  );
}
