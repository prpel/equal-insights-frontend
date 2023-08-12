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
            employmentByGenderAndGrade: [{
                category: "2",
                partTimeWomen: 18,
                partTimeMen: 1,
                fullTimeWomen: 10,
                fullTimeMen: 1
            },{
                category: "3/4",
                partTimeWomen: 11,
                partTimeMen: 4,
                fullTimeWomen: 4,
                fullTimeMen: 8
            },{
                category: "5",
                partTimeWomen: 25,
                partTimeMen: 37,
                fullTimeWomen: 11,
                fullTimeMen: 20
            },{
                category: "6",
                partTimeWomen: 60,
                partTimeMen: 105,
                fullTimeWomen: 5,
                fullTimeMen: 54
            },{
                category: "7/8",
                partTimeWomen: 126,
                partTimeMen: 205,
                fullTimeWomen: 13,
                fullTimeMen: 138
            },{
                category: "9",
                partTimeWomen: 91,
                partTimeMen: 135,
                fullTimeWomen: 38,
                fullTimeMen: 130
            },{
                category: "10/11",
                partTimeWomen: 117,
                partTimeMen: 196,
                fullTimeWomen: 60,
                fullTimeMen: 183
            },{
                category: "12",
                partTimeWomen: 14,
                partTimeMen: 72,
                fullTimeWomen: 7,
                fullTimeMen: 76
            },{
                category: "Senior",
                partTimeWomen: 9,
                partTimeMen: 75,
                fullTimeWomen: 9,
                fullTimeMen: 80
            },{
                category: "All staff",
                partTimeWomen: 471,
                partTimeMen: 892,
                fullTimeWomen: 157,
                fullTimeMen: 698
            }],
            genderPayGap: {
                mean: 0.109,
                median: 0.06
            }
        }
    };
}