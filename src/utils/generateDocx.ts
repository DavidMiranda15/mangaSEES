import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import type { Manga } from "../types";

export const generateMangaDocx = async (manga: Manga) => {
    const doc = new Document({
        sections: [{
            children: [
                new Paragraph({
                    children: [
                        new TextRun({ text: "CONTRATO DE RENTA - MangaSEES", bold: true, size: 32, color: "0891b2" }),
                    ],
                    spacing: { after: 400 }
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: `Cliente: `, bold: true }),
                        new TextRun({ text: manga.cliente }),
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: `Manga Rentado: `, bold: true }),
                        new TextRun({ text: manga.nombre }),
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: `Notas: `, bold: true }),
                        new TextRun({
                            text: manga.descripcion || "Sin observaciones",
                            italics: true 
                        })
                    ],
                    spacing: { before: 200 }
                }),
            ],
        }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `Contrato_${manga.nombre.replace(/\s+/g, '_')}.docx`);
};