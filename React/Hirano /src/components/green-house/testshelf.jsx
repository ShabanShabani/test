import React, { Component } from 'react';

class Shelf extends Component {
    constructor(props){
        super(props)
        this.state={
            divs:[]
        }
    }

    componentDidMount() {
        let {divs}=this.state;
        var blocks = [2000,5000];
        var filled = 378;
        var i;
        var full = 100;
        var rafti=0;
        var con = 0;
        var test = 378;
        for(var a=0;a<blocks.length;a++){
            for (i = rafti; blocks[a] > 0;i++) {
                test=378;
                if(con>0){
                    blocks[a]-=con;
                    test=con;
                    con=0;
                }else{
                    blocks[a]-=filled;
                }  
               
                if(blocks[a]<0){
                    test+=blocks[a];
                    con=378-test
                }else{
                    rafti++;
                }
                var filledPer = this.percentage(test, filled);
                divs=divs.concat({class:`in mbjellja${a}`,height:filledPer})
            }
        }
        this.setState({
            divs
        })
    }

    percentage(partialValue, totalValue) {
        return (100 * partialValue) / totalValue;
    }

    render() { 
        const {divs}=this.state;
        return ( 
            <React.Fragment>
                    {divs.map((e, index) =>
                        <div key={index} id='shelf' ref={'shelf'} className={`shelf`}>
                            <div className={e.class}  style={{height: e.height+'%'}}>
                            </div>
                        </div>
                        )
                    }
            </React.Fragment>
         );
    }
}
 
export default Shelf;