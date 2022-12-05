# Analytics-Insights
## User Activity
[User Activity](https://github.com/oscarmmv/Analytics-Insights/blob/main/heatmap/demo/useractivity.js)
Returns a user activity object
```  
  {
    id: userId,
    data: [[261, 131],[258, 123],[261, 110],[274, 104],[278, 115],[268, 134],[254, 140],[252, 131],
          [269, 107],[278, 106],[279, 122],[263, 137],[257, 137],[259, 124],[267, 114],[269, 121],
          [268, 142],[265, 147],[265, 142],[268, 130],[274, 124],[274, 138],[266, 162],[265, 163],
          [268, 143],[272, 136],[273, 140],[273, 157],[264, 171],[263, 170],[264, 151],[265, 148],
          [267, 149],[268, 171],[263, 183],[262, 200],[268, 230],[275, 246],[282, 252],[282, 247],
          [274, 238],[271, 235],[274, 240],[289, 257],[305, 272],[312, 279],[315, 286],[316, 295],
          [312, 312],[306, 325],[295, 340],[284, 351],[277, 359],[272, 367],[269, 373],[268, 376],
          [268, 377],[271, 380],[288, 386],[292, 388],[274, 402],[222, 430],[184, 447],[164, 455],
          [160, 457],[131, 461],[106, 461],[93, 459],[84, 459],[83, 459],[83, 460],[84, 468],
          [91, 521],[91, 537]],
    exitpoints: [
      { 
        start: 4, 
        end: 7 },
      { 
        start: 6, 
        end: 7 
      }
  ],
  time: 17
} 
```
## Activity Graph
[User Activity](https://github.com/oscarmmv/Analytics-Insights/blob/main/heatmap/demo/useractivity.js)
Takes in an array of timestamps and compilies it for chart.js

### Example for daily timestamps
``` [9:18:28,10:59:58,13:38:21,15:00:09,19:22:18,20:08:57,22:52:28,23:48:32]```

### Example for daily timestamps
``` [Mon Dec 03,Mon Dec 03,Mon Dec 03,Mon Dec 04,Mon Dec 04,Mon Dec 05,Mon Dec 05]```

# Activity Metrics
Calculates a metrics based on increase of seconds, number of clicks per second and number of handle clicks

# Handle View Time (WIP)
[Handle View Time](http://127.0.0.1:5500/index.html)
Times the seconds a user is viewing another page after clicking a handle.
