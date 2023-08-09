/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    return {
        analysisId: params.slug,
        analysis: {
            year: 2023,
            diversityProfile: [
                { category: "Female", percent: 60 },
                { category: "BAME", percent: 12 },
                { category: "Disabled", percent: 6 },
                { category: "LGB", percent: 5 }
            ],
            employmentByGenderAndGrade: {
                partTimeWomen: [
                    { grade: 2, count: 18 },
                    { grade: 3/4, count: 11 },
                    { grade: 5, count: 25 },
                    { grade: 6, count: 60 },
                    { grade: 7/8, count: 126 },
                    { grade: 9, count: 91 },
                    { grade: 10/11, count: 117 },
                    { grade: 12, count: 14 },
                    { grade: "Senior", count: 9 },
                    { grade: "All staff", count: 471 }
                ],
                partTimeMen: [
                    { grade: 2, count: 1 },
                    { grade: 3/4, count: 4 },
                    { grade: 5, count: 37 },
                    { grade: 6, count: 105 },
                    { grade: 7/8, count: 205 },
                    { grade: 9, count: 135 },
                    { grade: 10/11, count: 196 },
                    { grade: 12, count: 72 },
                    { grade: "Senior", count: 75 },
                    { grade: "All staff", count: 892 }
                ],
                fullTimeWomen: [
                    { grade: 2, count: 10 },
                    { grade: 3/4, count: 4 },
                    { grade: 5, count: 11 },
                    { grade: 6, count: 5 },
                    { grade: 7/8, count: 13 },
                    { grade: 9, count: 38 },
                    { grade: 10/11, count: 60 },
                    { grade: 12, count: 7 },
                    { grade: "Senior", count: 9 },
                    { grade: "All staff", count: 157 }
                ],
                fullTimeMen: [
                    { grade: 2, count: 1 },
                    { grade: 3/4, count: 8 },
                    { grade: 5, count: 20 },
                    { grade: 6, count: 54 },
                    { grade: 7/8, count: 138 },
                    { grade: 9, count: 130 },
                    { grade: 10/11, count: 183 },
                    { grade: 12, count: 76 },
                    { grade: "Senior", count: 80 },
                    { grade: "All staff", count: 698 }
                ]
            },
            genderPayGap: {
                mean: 0.109,
                median: 0.06
            }
        }
    };
}