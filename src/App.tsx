import { useState } from "react";
import MemberForm from "./components/MemberForm";
import MemberList from "./components/MemberList";
import type { Member } from "./types/member";

export default function App() {
  const [members, setMembers] = useState<Member[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddOrUpdate = (data: Member) => {
    if (editingIndex !== null) {
      const updated = [...members];
      updated[editingIndex] = data;
      setMembers(updated);
      setEditingIndex(null);
    } else {
      setMembers((prev) => [...prev, data]);
    }
  };

  const handleEdit = (index: number) => setEditingIndex(index);
  const handleDelete = (index: number) => setMembers(members.filter((_, i) => i !== index));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8 flex justify-center items-start">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl w-full">
        {/* ฟอร์ม */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex-1">
          <MemberForm
            onSubmit={handleAddOrUpdate}
            defaultValues={editingIndex !== null ? members[editingIndex] : undefined}
            editingIndex={editingIndex}
          />
        </div>

        {/* รายชื่อสมาชิก */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex-1">
          <MemberList members={members} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}
