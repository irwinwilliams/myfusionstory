var descriptions=[
{stage: "Overall", story:"'Finished in 9:56:36, at pace 15:11 per mile, the top 20% of runners overall. '"},
{stage: "Archion", story:"'Finished in 2:40:45, at pace 19:39 per mile, the top 28% of runners overall. Overtaking 5 runners compared to the last race, and passed by 24.'"},
{stage: "Covigne", story:"'Finished in 2:02:30, at pace 14:15 per mile, the top 22% of runners overall. Overtaking 5 runners compared to the last race, and passed by 21.'"
},{stage: "Chanolo", story:"'Finished in 1:52:48, at pace 12:36 per mile, the top 16% of runners overall. Overtaking 31 runners compared to the last race, and passed by 5.'"
},{stage: "Paragrant", story:"'Finished in 1:29:00, at pace 17:29 per mile, the top 24% of runners overall. Overtaking 1 runners compared to the last race, and passed by 47.'"
},{stage: "Breezy", story:"'Finished in 48:16, at pace 17:12 per mile, the top 10% of runners overall. Overtaking 56 runners compared to the last race, and passed by 2.'"
},{stage: "Alpha", story:"'Finished in 1:03:17, at pace 10:11 per mile, the top 25% of runners overall. '"}
];

function findDescription(name)
{
    for (var i=0;i<descriptions.length;i++)
    {
        if (descriptions[i].stage.toLowerCase().indexOf(name) > -1) return descriptions[i].story;
    }
}