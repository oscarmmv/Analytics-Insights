var ctx = document.getElementById("myChart").getContext("2d");
var chart

function getMockDaily(count) {
    timeStamp = []
    timeData = []
    theData = []
    for(let i=0; i<count; i++) {
        var hour = "" + Math.floor(Math.random() * 24);
        var minute = Math.floor(Math.random() * 60);
        var second = Math.floor(Math.random() * 60);
        if(hour < 10) {
            hour = '0' + hour;
        }
        timeStamp.push(hour+':'+minute+':'+second);
    }
        console.log(timeStamp);
        for(let i=0; i<timeStamp.length; i++) {
            timeData.push(parseInt(timeStamp[i].slice(0, 2)))
        }
        const countOccur = {};
        for (const element of timeData) {
            if (countOccur[element]) {
                countOccur[element] += 1;
            } else {
                countOccur[element] = 1;
            }
        }
        for(let i=0; i<24; i++) {
            if(countOccur[i]) {
                theData.push(countOccur[i]);
            } else {
                theData.push(0);
            }
        }
        var config = {
            type: 'line',
            data: {
                labels: [
                                '24:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00',
                                '08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00',
                                '16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00',
                            ],
              datasets: [{
                label: "Number of views",
                borderColor: "rgb(163, 145, 185)",
                backgroundColor: "rgba(163, 145, 185, 0.5)",
                data: theData,
                fill: true,
                tension: 0.3,
              }]
            },
            options: {
              responsive: true,
              tooltips: {
                mode: 'label',
              },
              hover: {
                mode: 'nearest',
                intersect: true
              },
              scales: {
                y: {
                    beginAtZero: true,
                    grace: '10%',

                },
                x: {
                  grid: {display: false},
                }
              },
              plugins: {
                  legend: {
                  display: false
                  },
              }
            }
          };
          
          chart = new Chart(ctx, config);
}

  
// new Date() ===> Wed Nov 16 2022 18:09:15 GMT-0500 (Eastern Standard Time)
function getMockWeekly(count) {
    // new Date() ===> Wed Nov 16 2022 18:09:15 GMT-0500 (Eastern Standard Time)
    //everytime a user enters a page a the date is stored
    // ['Nov 16','Nov 16','Nov 16','Nov 16','Nov 16','Nov 17',
    // 'Nov 18','Nov 19','Nov 20','Nov 21','Nov 22','Nov 22']
    day = []
    weeklyActivity = []
    labels = []

    for(let i=0; i<count; i++) {
        var index = Math.floor(Math.random() * 10)
        if(index == 0) {day.push('Nov 16')}
        if(index == 1) {day.push('Nov 17')}
        if(index == 2) {day.push('Nov 18')}
        if(index == 3) {day.push('Nov 19')}
        if(index == 4) {day.push('Nov 20')}
        if(index == 5) {day.push('Nov 21')}
        if(index == 6) {day.push('Nov 22')}
    }
    
    const countOccur = {};
        for (const element of day) {
            if (countOccur[element]) {
                countOccur[element] += 1;
            } else {
                countOccur[element] = 1;
            }
        }
        
        for(let i=0; i<7; i++) {
          if(Object.values(countOccur)[i]) {
              weeklyActivity.push(Object.values(countOccur)[i]);
          } else {
            weeklyActivity.push(0);
          }
       }
      
       //labels 
       // nov 11
       //get current date 16
       //last page open was nov 11

       // get current date
       // then last date
       //if date between current then last is greater 
       //than 7 all entries are 0
       


       //getDay() ===>	Get weekday as a number (0-6)
       // Calculate average
       totalWeekly = [0,1,2,3,4,5,6]

       for(let i=0;i<110;i++) {
        var x = Math.floor(Math.random() * 7)
        if(x == 0) {totalWeekly.push(0)}
        if(x == 1) {totalWeekly.push(1)}
        if(x == 2) {totalWeekly.push(2)}
        if(x == 3) {totalWeekly.push(3)}
        if(x == 4) {totalWeekly.push(4)}
        if(x == 5) {totalWeekly.push(5)}
        if(x == 6) {totalWeekly.push(6)}
       }
     
       
       
       avgWeeklyActivity = []
       
       var numOccur = {};
        for (const element of totalWeekly) {
            if (numOccur[element]) {
              numOccur[element] += 1;
            } else {
              numOccur[element] = 1;
            }
        }

        for(let i=0; i<7; i++) {
          if(Object.values(numOccur)[i]) {
            avgWeeklyActivity.push(Object.values(numOccur)[i]);
          } else {
            avgWeeklyActivity.push(0);
          }
          avgWeeklyActivity[i] -= 1;
       }
       
           
        var config = {
            type: 'line',
            data: {
                labels: ['Nov 16','Nov 17','Nov 18','Nov 19','Nov 20','Nov 21','Nov 21'],
              datasets: [{
                label: "Number of views",
                borderColor: "rgb(163, 145, 185)",
                backgroundColor: "rgba(163, 145, 185, 0.5)",
                data: weeklyActivity,
                fill: 'origin',
                tension: 0.3,
              },
              {
                label: "Average views",
                borderColor: "rgba(220, 145, 120, 0.5)",
                backgroundColor: "rgba(220, 145, 120, 0.5)",
                data: avgWeeklyActivity,
                fill: false,
                tension: 0.3,
                borderDash: [10,5]
              }
            ],
            },
            options: {
              responsive: true,
              tooltips: {
                mode: 'label',
              },
              hover: {
                mode: 'nearest',
                intersect: true
              },
              scales: {
                y: {
                    beginAtZero: true,
                    grace: '10%'
                },
                x: {
                  grid: {display: false}
                }
              },
              plugins: {
                  legend: {
                  display: false
                  },
              }
            }
          };
          
          chart = new Chart(ctx, config);
}


getMockDaily(50);





  function updateDaily() {
    chart.destroy();
    getMockDaily(50);
  }
  function updateWeekly() {
    chart.destroy();
    getMockWeekly(200);
  }
