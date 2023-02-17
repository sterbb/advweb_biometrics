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

                dt = d_t.split(" ").map(function(line){
                    return line.split(" ");
                });


                records.push({"id":id,"date":dt[0][0],"time":dt[1][0] });

                
            });
            
            console.log(records);
            console.log(records[0]["id"]);
         

            $("#hello").text(JSON.stringify(records));

            var emp_at = [];

            records.forEach(number => {

                console.log(number["id"]+ "hello");
                var current_emp = [number["id"]];
                
                if(!emp_at.includes(number["id"])){
                    emp_at.push(number["id"] );
                }
               
            });

            emp_at.sort(function (a,b) {return a - b });

            console.log(emp_at);

            
            console.log(emp_at[0]);

            emp_at.forEach(emp_num =>{


                records.forEach(number =>{
                    if(emp_num == number["id"]){
                       //var time = new Date(number["time"]).toLocaleTimeString("en-US");
                        if(number["time"] < 12){
                            console.log(number["time"] + "morning");
                        }else{
                            console.log(number["time"] + "afternoon");
                        }
                        
                    }
                });
                                


            })


        }

    
        




     
    });

    // const input = document.querySelector('input[type="file"]');
    // input.addEventListener('change',function(e){
    //     console.log(input.files);
    // })

});
