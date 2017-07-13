var RuleEngine = require('node-rules');
  
function myConsequence (R) {
        console.log("transactionTotal")
        this.result = false;
        R.next();
}  

//define the rules 
var rules = [{
    "condition": function(R) {
        R.when(this && (this.transactionTotal < 500));
    },
    "consequence": myConsequence,
/*    function(R) {
        console.log("transactionTotal")
        this.result = false;
        R.next();
    }*/
},  {
    "condition": function(R) {
        R.when(this && (this.extra > 1));
    },
    "consequence": function(R) {
        console.log("extra")
        this.other = "true";
        R.stop();

    }
}


];
 
//sample fact to run the rules on	 
var fact = {
    "name":"user4",
    "extra": 3,
    "application":"MOB2",
    "transactionTotal":400,
    "cardType":"Credit Card",
};
 
//initialize the rule engine 
var R = new RuleEngine(rules);
 
//Now pass the fact on to the rule engine for results 
R.execute(fact, function(result){ 
 
    if(result.result) 
        console.log("Payment Accepted"); 
    else 
        console.log("Payment Rejected");
    
});
var str = R.toJSON()
console.log(str)