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
        Exam
    } = body;

    try {

        // insert question
        const result = await sql`
        INSERT INTO "Questions"
        ("Qusetion_Statement","Option_1","Option_2","Option_3","Option_4","Image","Answer")
        VALUES
        (${Qusetion_Statement},${Option_1},${Option_2},${Option_3},${Option_4},${Image},${Answer})
        RETURNING *
        `;

        const questionId = result[0].Ques_id;

        // insert exam mapping
        await sql`
        INSERT INTO "ExamQuestion" ("Ques_id","Exam")
        VALUES (${questionId}, ${Exam})
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