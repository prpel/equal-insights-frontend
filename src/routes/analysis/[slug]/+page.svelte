<script>
    import DiversityChart from "$lib/charts/DiversityProfile.svelte";
    import GenderPayGapChart from "$lib/charts/GenderPayGap.svelte";
    import EmploymentByGenerAndGradeChart from "$lib/charts/EmploymentByGenerAndGrade.svelte";

    /** @type {import('./$types').PageData} */
    export let data;
</script>

<h1>Here is your analysed data</h1>

<p>Bookmark this page, you can return here or share your analysis with this link</p>

<h2>Diversity Profile</h2>
<!-- <div class="px-10 md:px-4 md:w-2/3">
    <Chart data={data.analysis.diversityProfile} />
</div> -->

<div class="flex">
    <div class="flex-1 w-512 rounded-lg mr-4">
        <DiversityChart data={data.analysis.diversityProfile} />
    </div>
    <div class="flex-1 w-512 rounded-lg mr-4">
        <GenderPayGapChart data={data.analysis.genderPayGap}/>
    </div>
</div>
<EmploymentByGenerAndGradeChart data={data.analysis.employmentByGenderAndGrade} />