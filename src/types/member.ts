// filepath: src/types/member.ts
import { z } from "zod";

export const MemberSchema = z.object({
  prefix: z.string().min(1, "กรุณาเลือกคำนำหน้า"),
  firstName: z.string().min(1, "กรุณากรอกชื่อ"),
  lastName: z.string().min(1, "กรุณากรอกนามสกุล"),
  photo: z.any().optional(), // จะจัดการไฟล์เอง
  workHistory: z.string().optional(),
  achievements: z.string().optional(),
  minister: z.string().optional(),
  ministry: z.string().optional(),
  party: z.string().min(1, "กรุณาระบุพรรคการเมือง"),
});

export type Member = z.infer<typeof MemberSchema>;
