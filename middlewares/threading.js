function ProcessArray(data, handler, callback) {
    var maxtime = 100;		// chunk processing time
    var delay = 20;		// delay between processes
    var queue = data.concat();	// clone original array

    setTimeout(function() {

        var endtime = +new Date() + maxtime;
    
        do {
          handler(queue.shift());
        } while (queue.length > 0 && endtime > +new Date());
        if (queue.length > 0) {
            setTimeout(arguments.callee, delay);
          }
          else {
            if (callback) callback();
          }
      
        }, delay);
      }

      function Process(dataitem) {
        console.log(dataitem);
      }
      
      // processing is complete
      function Done() {
        console.log("Done");
      }
      
      // test data
      
      // process all items
    