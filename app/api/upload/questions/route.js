import sql from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {

    const body = await req.json();

    const {
        Qusetion_Statement,
        Option_1,
        Option_2,
        Option_3,
        Option_4,
        Image,
        Answer
    } = body;

    try {

        const result = await sql`
        INSERT INTO "Questions"
        ("Qusetion_Statement", "Option_1", "Option_2", "Option_3", "Option_4", "Image", "Answer")
        VALUES
        (${Qusetion_Statement}, ${Option_1}, ${Option_2}, ${Option_3}, ${Option_4}, ${Image}, ${Answer})
        RETURNING *
        `;

        console.log(result);

        return NextResponse.json({ success: true, data: result });

    } catch (e) {

        console.log("error in sql", e);

        return NextResponse.json({ error: "Database error" });

    }
}