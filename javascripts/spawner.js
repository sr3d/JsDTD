var gameTrigger = [
  {
    when:        2
    ,delayMin:    4 /* time between creep spawns */
    ,delayMax:    5
    ,multiplier:  1  /* for creeps get stronger */
    ,creeps: [
       { count: 5,      type: Soot }
      ,{ count: 5,      type: SootLevel2 }
      ,{ count: 4,      type: Soot }
      ,{ count: 1,      type: SootLevel2 }  // can be boss as well 
      
      ,{ count: 4,      type: Soot }
      ,{ count: 3,      type: SootLevel2 }
      ,{ count: 4,      type: Soot }
      ,{ count: 3,      type: Soot }
      ,{ count: 3,      type: SootLevel2 }
      ,{ count: 2,      type: Soot }
    ]
  }



  ,{
    when:        5
    ,delayMin:    4 /* time between creep spawns */
    ,delayMax:    5
    ,multiplier:  1  /* for creeps get stronger */
    ,creeps: [
       { count: 5,      type: Soot }
      ,{ count: 5,      type: SootLevel2 }
      ,{ count: 4,      type: Soot }
      ,{ count: 1,      type: SootLevel2 }  // can be boss as well 
    ]
  }

];