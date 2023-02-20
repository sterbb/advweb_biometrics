$(function(){



    // const input1 = $("#bio_data")[0].files[0];
    // input1.on("change", function(e){
    //     console.log(input1);
    // })

    $("#bio_data").change(function(){
        var data;
        alert("hello");
        const input1 = $("#bio_data")[0].files[0];
        console.log(input1);

        let reader = new FileReader();
        
        reader.readAsText(input1);
        reader.onload = function(){
            console.log(reader.result); 
            data = reader.result;
            // const lines = reader.result.split('\n').map(function(line){
            //      data = line.split('\t').slice(0,2);
                 
            // });
            data2 = data.split('\n').map(function(line){
                return line.split('\t').slice(0, 2);
            });
      
            console.log(data2[0][1]);

            var dt;
            var records =[];

            data2.forEach(number => {


                var d_t = number[1];
                var id = number[0];

                var dt = new Date(d_t);

                //var timedate = date.getTime;

                console.log(dt);

                records.push({"id":id,"date_time":dt});

                
            });
            
            console.log(records);
            console.log(records[0]["id"]);
         

            $("#hello").text(JSON.stringify(records));

            var emp_at = [];

            records.forEach(number => {

                console.log(number["id"]+ "hello");
                //var current_emp = [number["id"]];
                
                if(!emp_at.includes(number["id"])){
                    emp_at.push(number["id"] );
                }
               
            });

            emp_at.sort(function (a,b) {return a - b });

            console.log(emp_at);

            
            console.log(emp_at[0]);

            var employee_b = [];
            emp_at.forEach(emp_num =>{
                var biometrics = [];
                var morning = [];
                var afternoon = [];
    
                records.forEach(number =>{
                    if(emp_num == number["id"]){
                        var time = number["date_time"];
                        if(time.getHours() < 13){
                            console.log(emp_num + time + "morning");
                            morning.push(time);
                        }else{
                            console.log(emp_num+ time + "afternoon");
                            afternoon.push(time);
                        }
                        
                    }
                   
                });
                biometrics.push(emp_num);
                biometrics.push(morning);
                biometrics.push(afternoon);

                employee_b.push(biometrics);
            })

            console.log(employee_b);

            var femployee_b = [];

            employee_b.forEach(number=>{
            
                var biometrics =[];
                biometrics.push(number[0]);
                biometrics.push("January 13, 2023");
                
                //morning time in and time out
                for(let i =0; i < number[1].length; i++){
                    var d_t = number[1][i];

                    //time in
                    if(d_t.getHours() <= 8 && d_t.getMinutes() <= 45){
                        biometrics.push(number[1][i]);

                        for(let i =0; i < number[1].length; i++){
                            var d_t = number[1][i];
        
                            if(d_t.getHours() <= 12 && d_t.getMinutes() >= 30){
                                biometrics.push(number[1][i]);
                                break;
                            }
                        
                        }
                        
                        break;
                    }
                }
                //check morning absent (no time in/time out)
                if(biometrics.length != 4){
                    if(biometrics.length == 3){
                        biometrics.push("ABSENT");
                    }else{
                        biometrics.push("ABSENT");
                        biometrics.push("ABSENT");
                    }
                }

                for(let i =0; i < number[2].length; i++){
                    var d_t = number[2][i];

                    //time in
                    if(d_t.getHours() <= 13 && d_t.getMinutes() <= 45){
                        biometrics.push(number[2][i]);

                        for(let i =0; i < number[2].length; i++){
                            var d_t = number[2][i];
        
                            if(d_t.getHours() >= 17 && d_t.getMinutes() <= 59){
                                biometrics.push(number[2][i]);
                                break;
                            }
                        
                        }
                        break;
                    }
                }

                  //check if afternoon absent (no time in/time out)
                  if(biometrics.length != 6){
                    if(biometrics.length == 5){
                        biometrics.push("ABSENT");
                    }else{
                        biometrics.push("ABSENT");
                        biometrics.push("ABSENT");
                    }
                }


                femployee_b.push(biometrics);
        
                console.log(biometrics);
            });


               console.log(femployee_b);
        

            femployee_b.forEach(employee=>{
                var biometrics_table = $("#biometrics > tbody");
                var data = '<tr  class="bg-gray-500 text-white">';
                var morning;
                var afternoon;
                
                data += '<td>'+employee[0] + '</td>'    
                data += '<td>'+employee[1] + '</td>'
                data += '<td>'+getTime(employee[2]) + '</td>'
                data += '<td>'+getTime(employee[3]) + '</td>'
                data += '<td>'+getTime(employee[4]) + '</td>'
                data += '<td>'+getTime(employee[5]) + '</td>'
                data+= '</tr>'


                biometrics_table.append(data);
            });

            


        }


        // const reader = new FileReader();

        // reader.readAsText(files[0]);
         
        // console.log(reader.result);

     
    });

    // const input = document.querySelector('input[type="file"]');
    // input.addEventListener('change',function(e){
    //     console.log(input.files);
    // })

});


function getTime(time){
    if(time != "ABSENT"){
        var date = new Date(time);
        var hour =date.getHours();
        var minutes =date.getMinutes();
        var seconds =date.getSeconds();
        var result = hour + ":" + minutes + ":" + seconds;
        return result;
    }else{
        return time;
    }
}