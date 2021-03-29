const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine' , 'ejs');
app.use(express.static('public'));


app.get('/',function(req ,res){
    res.render('index')
})

app.post("/EPrest" , function(req ,res){
    let body = req.body;

       

    let phi = Number(body.phi);
    let sinval =  Math.sin( (phi *3.141/180 ) );
    let ans1 = 1-sinval;

    let pi = Number(body.pi);
    let ans2 = 0.44 + 0.42 * (pi/100);

    let ans3 = 0.95 - sinval;

    let ocr = Number(body.ocr);
    let ans4 =( 1-sinval)* Math.pow( ocr  , sinval );

    let pr = Number(body.pr);
    let ans5 = pr / (1 - pr);

    
    if(body.phi == ''){
        ans1 = "Not Applicable";
        ans3 =  "Not Applicable";
        ans4 = "Not Applicable";
    }
    if(body.pi == ''){
        ans2 = "Not Applicable";
    }
    if(body.ocr == ''){
        ans4 = "Not Applicable";
    }
    if(body.pr == ''){
        ans5 = "Not Applicable";
    }


    res.render('EPrest2' , { A : [ ["For corse grained soil" , ans1 ], [ "Grained ,  normally consolidated soil :" ,ans2], [ "Brooker & Kulway :" ,ans3], ["Mayne & Kulway :" ,ans4], ["Elastic Solution :" ,ans5]]});

});
app.get("/EPrest" , function(req ,res){
    res.render('EPrest')
});

app.post("/EPactive" , function(req ,res){
    let body = req.body;
    let phi = Number(body.phi);
    // let ocr =  Number(body.ocr);
    // let pr =  Number(body.pr);
    // let pi =  Number(body.pi);
    let theta =  Number(body.theta);
    let beta =  Number(body.beta);
    let delta =  Number(body.delta);
    let alpha = phi + 45;

    let sinphi =  Math.sin( (phi *3.141/180 ) );
    let cosbeta = Math.cos(beta*3.14 / 180);
    let cosphi = Math.cos(phi*3.14 / 180);
    let cotalpha = 1 / Math.tan( alpha*3.14 / 180);



    let ans1  = (1 - sinphi)/(1+ sinphi);

    let ans2 = cotalpha * cotalpha;

    let ans3 =( cosbeta  - Math.sqrt( cosbeta*cosbeta - cosphi*cosphi) );
    ans3 = ans3 / ( cosbeta  + Math.sqrt( cosbeta*cosbeta - cosphi*cosphi) );

    let a1 = phi - theta;
    a1 = Math.cos(a1*3.14 / 180);
    a1 = a1*a1;

    let a2 = delta + theta;
    a2 = Math.cos(a2*3.14 / 180);
    
    let a3 = delta   + phi ;
    a3 = Math.sin(a3*3.14 / 180);

    let a4 = phi - alpha;
    a4 = Math.sin(a4*3.14 / 180);

    let a5 = theta - alpha;
    a5 = Math.cos(a5*3.14 / 180);

    let costheta = Math.cos(theta*3.14 / 180);
    let ans4 =  a1 / (costheta * costheta * a2 );
    ans4 = ans4 / (1+ (Math.sqrt(a3 * a4 / (a2*a5))));
    ans4 = ans4 / (1+ (Math.sqrt(a3 * a4 / (a2*a5))));
    
    console.log(ans1+" "+ans2+" "+ans3+" "+ans4);

    if(body.phi=='' && body.beta == ''){
        ans1  = "Not Applicable";
        ans2  = "Not Applicable";
        ans3  = "Not Applicable";
    }
    if(body.delta =='' && body.theta=='' && body.delta ==''){
        ans4  = "Not Applicable";
        }
        res.render('EPrest2' , { A : [ ["Rankine Earth Theory " , ans1 ], [ "Rankine Earth Theory " ,ans2], [ "Rankine Earth Theory for inclined backfill"  ,ans3], ["Coulomb's Theory" ,ans4] ]});

});
app.get("/EPactive" , function(req ,res){
    res.render('EPactive')
});

app.post("/EPpassive" , function(req ,res){
    let body = req.body;
    let phi = Number(body.phi);
    // let ocr =  Number(body.ocr);
    // let pr =  Number(body.pr);
    // let pi =  Number(body.pi);
    let theta =  Number(body.theta);
    let beta =  Number(body.beta);
    let delta =  Number(body.delta);
    let alpha = phi + 45;

    let sinphi =  Math.sin( (phi *3.141/180 ) );
    let cosbeta = Math.cos(beta*3.14 / 180);
    let cosphi = Math.cos(phi*3.14 / 180);
    let cotalpha = 1 / Math.tan( alpha*3.14 / 180);

    let ans1  = (1 + sinphi)/(1- sinphi);


    let ans3 =( cosbeta  + Math.sqrt( cosbeta*cosbeta - cosphi*cosphi) );
    ans3 = ans3 / ( cosbeta  - Math.sqrt( cosbeta*cosbeta - cosphi*cosphi) );

    let a1 = phi + theta;
    a1 = Math.cos(a1*3.14 / 180);
    a1 = a1*a1;

    let a2 = delta - theta;
    a2 = Math.cos(a2*3.14 / 180);
    
    let a3 = delta   + phi ;
    a3 = Math.sin(a3*3.14 / 180);

    let a4 = phi + alpha;
    a4 = Math.sin(a4*3.14 / 180);

    let a5 =  alpha - theta;
    a5 = Math.cos(a5*3.14 / 180);

    let costheta = Math.cos(theta*3.14 / 180);
    let ans4 =  a1 / (costheta * costheta * a2 );
    ans4 = ans4 / (1- (Math.sqrt(a3 * a4 / (a2*a5))));
    ans4 = ans4 / (1- (Math.sqrt(a3 * a4 / (a2*a5))));
   
    if(body.phi=='' && body.beta == ''){
        ans1  = "Not Applicable";
        ans3  = "Not Applicable";
    }
    if(body.delta =='' && body.theta=='' && body.delta ==''){
        ans4  = "Not Applicable";
        }

    res.render('EPrest2' , { A : [ ["Rankine Earth Theory " , ans1 ], [ "Rankine Earth Theory for inclined backfill"  ,ans3], ["Coulomb's Theory" ,ans4] ]});
});

app.get("/EPpassive" , function(req ,res){
    res.render('EPpassive')
});


app.get("/StressNoWater" , function(req ,res){
    res.render('StressNoWater')
});

app.post("/StressNoWater" , function(req ,res){
    let body = req.body;
    let Y = Number(body.Y);
   // let Yw = Number(body.Yw);
    let Q = Number(body.Q);
    let H = Number(body.H);

    let Ka =  Math.tan( ( 45 -  (Q/2) )*3.141/180 ) ; 
    Ka = Ka * Ka;
 

    console.log("KA :" ,Ka);

    let Kp = 1 / Ka ;
 
    // 1.
    let Pa_ = Y * H * Ka ;

    //2.
    let Yo = Pa_ / ((Kp - Ka) * Y );
  //  Yo =Number( Yo.toFixed(2) );

    //3.
    let Pa  = ( Pa_ * H + Pa_ * Yo ) / 2 ;
    //Pa =Number( Pa.toFixed(2) );

    //6.
    let Pp3_ = Y * H * Kp  + Y * Yo * (Kp - Ka);

    //7.
    let Y1 = ( Pa_ * H * (H + 3 * Yo) + Pa_ * Yo * 2 * Yo )/(6*Pa);

    // Coefficients C
    let C1 = Pp3_ / (Y * (Kp - Ka ));

    let C2 = -8 * Pa / ( (Kp - Ka ) * Y );

    let C3 = -6 * Pa * (2 * Y1 * Y * (Kp - Ka ) + Pp3_ ) / ( Y * ( Kp - Ka)* Y * ( Kp - Ka) );
    
    let C4 = -1*(6 * Pa * Y1 * Pp3_ + 4 * Pa * Pa ) / ( Y * (Kp - Ka) * Y * (Kp - Ka));

    let D = Number(0.001)  , aaa = Number(0) , best = 100;
    console.log(D);
    while(D <= 100){
        D = D.toFixed(3); 
         D  = Number(D);

       let temp = D*D*D*D + C1*D*D*D + C2*D*D + C3*D + C4 ;

        if(D=== Number(4.835)){console.log("at D = 4.835 " ,temp);}
        if(temp<= best && temp >0){//38.745
            aaa = D;
            best =temp;
        }  
        D = D +  0.001;
    }
    D = aaa;
    console.log(C1+ " "+ C2 + " "+C3+" "+C4);
    console.log( "Y1 :" , Y1);
    console.log( "Yo :" , Yo);
    console.log( "Pp3_ :" , Pp3_);
    console.log( "Pa :" , Pa);
    console.log( "Ka :" , Ka);
    console.log( "Kp :" , Kp);

    let ans = Number(D) + Number(Yo) ;
    // console.log(ans +" "+D+" "+Yo);
    res.render('EPrest2' , {A: [ ["Ka",Ka ] ,["Kp" , Kp] , [ "Pa bar" , Pa_] , ["Yo" , Yo] 
        , [ "Pp3_" , Pp3_] ,
        [ "Y1" , Y1] ,
        [ "C1" , C1 ],[ "C2" , C2 ],[ "C3" , C3 ],[ "C4" , C4 ],
        [ "D" , D],
        ["ans"  , ans]
]});
});

app.post("/StressWithWater" , function(req ,res){
    let body = req.body;
    let Y = Number(body.Y);
    let Yw = Number(body.Yw);
    let Q = Number(body.Q);
    let H = Number(body.H);
    let Ysat = Number(body.Ysat);
    let L2 = Number(body.L2);
    let L1 = H - L2;
    let Y_ = Ysat - Yw ;




    let Ka =  Math.tan( ( 45 -  (Q/2) )*3.141/180 ) ; 
    Ka = Ka * Ka;
 

    console.log("KA :" ,Ka);

    let Kp = 1 / Ka ;
 
    // 1.
    let P1 = Y * L1 * Ka ;

    //2.
    let P2 = ( Y * L1 + Y_*L2) * Ka ;

    //3.
    let L3  = P2 / (Y_ * (Kp - Ka));

    //4
    let Po = (P1 * L1 + 2*P1*L2 + (P2 - P1)*L2 + P2*L3)/2;

    //5
    let Z = ( P1 * L1 * ( (L1/3) + L2+L3 ) + P1*L2*(2*L3 + L2) + (P2-P1)*L2*(L3 + (L2/3)) + 
              P2*L3*L3/3 )/ (Po * 2);

    //6
    let P3 = (Y * L1 + Y_ *L2)*Kp + Y_*L3*(Kp-Ka);


    // Coefficients C
    let C1 = P3 / (Y_ * (Kp - Ka));

    let C2 = 8*Po / (Y_ * (Kp - Ka));

    let C3 = 6*Po*(2*Z*Y_*(Kp-Ka) + P3)/ (Y_*Y_*(Kp - Ka)*(Kp-Ka));

    
    let C4 = Po * (6*Z*P3 + 4*Po)/(Y_*Y_*(Kp-Ka)*(Kp-Ka));

    let D = Number(0.001)  , aaa = Number(0) , best = 100;
    console.log(D);
    while(D <= 100){
        D = D.toFixed(3); 
         D  = Number(D);

       let temp = D*D*D*D + C1*D*D*D - C2*D*D - C3*D - C4 ;

//        if(D=== Number(4.835)){console.log("at D = 4.835 " ,temp);}
        if(temp<= best && temp >0){//38.745
            aaa = D;
            best =temp;
        }  
        D = D +  0.001;
    }
    D = aaa;
    // console.log(C1+ " "+ C2 + " "+C3+" "+C4);
    // console.log( "P1 :" , P1);
    // console.log( "P2 :" , P2);
    // console.log( "P3 :" , P3);
    // console.log( "Po :" , Po);
    // console.log( "Z :" , Z);
    // console.log( "L3 :" , L3);

    let ans = Number(D) + Number(L3) ;

    res.render('EPrest2' , {A: [ ["Ka",Ka ] ,["Kp" , Kp] , [ "L3 :" , L3] , ["Z : " , Z] ,

    [ "P0" , Po ],[ "P1" , P1 ],[ "P2" , P2 ],[ "P3" , P3 ],   
     [ "C1" , C1 ],[ "C2" , C2 ],[ "C3" , C3 ],[ "C4" , C4 ],
    [ "D" , D],
    ["ans"  , ans]
]});
    console.log(ans +" "+D);
});
app.get("/StressWithWater" , function(req ,res){
    res.render('StressWithWater')
});

app.listen(5000 , function(){
    console.log("server started at port 3000");
})