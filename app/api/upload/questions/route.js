import sql from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {

    const body = await req.json();
    // console.log("question hitted");

    const {
        Qusetion_Statement,
        Option_1,
        Option_2,
        Option_3,
        Option_4,
        Image,
        Answer,
        Exam,
        Subject
    } = body;

    try {

        // insert question
        const subjId= await sql`select subject_id from "Subject" where subject_name=${Subject}`
        // console.log(subjId[0].subject_id)
        const result = await sql`
        INSERT INTO "Questions"
        ("Qusetion_Statement","Option_1","Option_2","Option_3","Option_4","Image","Answer","subject_id")
        VALUES
        (${Qusetion_Statement},${Option_1},${Option_2},${Option_3},${Option_4},${Image},${Answer},${subjId[0].subject_id})
        RETURNING *
        `;

        const questionId = result[0].Ques_id;
        const exam_id= sql`select exam_id from "Exam" where exam_name=${Exam}`
        // insert exam mapping
        await sql`
        INSERT INTO "ExamQuestion" ("Ques_id","Exam_id")
        VALUES (${questionId}, ${exam_id[0].exam_id})
        `;

        return NextResponse.json({
            success: true,
            questionId
        });

    } catch (e) {

        console.log("error in sql", e);

        return NextResponse.json({
            error: "Database error"
        });

    }
}