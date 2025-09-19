import type { Member } from "../types/member";

type Props = {
  members: Member[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
};

export default function MemberList({ members, onEdit, onDelete }: Props) {
  if (members.length === 0)
    return <p className="text-center text-gray-500">ยังไม่มีสมาชิก</p>;

  return (
    <ul className="space-y-4">
      {members.map((m, idx) => (
        <li key={idx} className="p-4 border rounded-lg shadow-sm bg-gray-50 flex gap-4 items-start">
          <div className="flex-shrink-0">
            {m.photo && m.photo[0] ? (
              <img
                src={URL.createObjectURL(m.photo[0])}
                alt={`${m.firstName} ${m.lastName}`}
                className="w-16 h-20 object-cover rounded-md border"
              />
            ) : (
              <div className="w-16 h-20 bg-gray-200 flex items-center justify-center text-gray-500 rounded-md">
                ไม่มีรูป
              </div>
            )}
          </div>
          <div className="flex-1">
            <p className="font-bold text-lg">{m.prefix}{m.firstName} {m.lastName}</p>
            <p className="text-gray-600">พรรค: {m.party}</p>
            {m.minister && <p className="text-gray-600">ตำแหน่ง: {m.minister} ({m.ministry})</p>}
            {m.workHistory && <p className="text-gray-500 text-sm">ประวัติ: {m.workHistory}</p>}
            {m.achievements && <p className="text-gray-500 text-sm">ผลงาน: {m.achievements}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <button onClick={() => onEdit(idx)}
              className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500">
              แก้ไข
            </button>
            <button onClick={() => onDelete(idx)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
              ลบ
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}