import React, { Component } from 'react';
import { withRouter } from "react-router"

class Shelf extends Component {
    constructor(props){
        super(props)
        this.state={
            shelfs:[],
            x: 0,
            y: 0
        }
    }

    onMouseMove(plant_id, shelf_id, e) {
        let classList = plant_id + ' ' + shelf_id
        let height = document.getElementsByClassName(classList)[0].parentNode.clientHeight
        let up = height / 2;
        let onclick = document.getElementsByClassName(classList)
        onclick[0].classList.add("active")
        let x = e.nativeEvent.offsetY
        if(up < x)
        {
            this.setState({ 
                x: x / 2
            });
        }
        else
        {
            this.setState({ 
                x: x
            });
        }
    }
    
    removeClass = (plant_id, shelf_id, e) => {
        let classList = plant_id + ' ' + shelf_id
        let onclick = document.getElementsByClassName(classList)
        onclick[0].classList.remove("active")
    }
    
    percentage(partialValue, totalValue) {
        return (100 * partialValue) / totalValue;
    }
    
    getShelfs(){ 
        return this.state.shelfs
    }

    stringToColour = (str)=> {
        str=str+"mbjellje"
        var hash = 7;
        for (var i = 0; i < str.length; i++) {
          hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        var colour = '#';
        for (var j = 0; j < 3; j++) {
          var value = (hash >> (j * 8)) & 0xFF;
          colour += ('00' + value.toString(16)).substr(-2);
        }
        return colour;
    }

    onPlantClick = (plant_id) =>
    {
        this.props.history.push({
            pathname: '/fill-card',
            state: { 
                plant_id: plant_id
            }
        })  
    }

    render() { 
        const { shelf, status } = this.props;
        const { x } = this.state;
        return ( 
            <React.Fragment>
                {status === 'green-house' ?
                    <React.Fragment>
                        <div className='top'>
                        { 
                            shelf.map((element,index) =>
                                index<=20 &&
                                <React.Fragment>
                                    <div className={`shelf-box`}>
                                        <span className={`shelf-name`}>{index+1}</span>
                                        <div key={index} id='shelf' className={`shelf`} >
                                                {element.plants?
                                                    element.plants.map((plant,idx)=>
                                                    <React.Fragment>
                                                        <div onClick={this.onPlantClick.bind(this, plant.plant_id)} key={idx} onMouseMove={this.onMouseMove.bind(this,plant.plant_id, element.id)} onMouseLeave={this.removeClass.bind(this,plant.plant_id, element.id)} className={`in mbjellja${''}`}  style={{height: 100/element.plants.length+'%',backgroundColor:this.stringToColour(plant.plant_id)}}>
                                                        </div>
                                                        <div className={`info-popup ${plant.plant_id + ' ' + element.id}`} style={{top: x}}>
                                                            <span className="title">Bexhi: {plant.plant_id}</span>
                                                            <span className="content">Numri i bllokave {plant.nr_blocks}</span>
                                                        </div>
                                                    </React.Fragment>
                                                    )
                                                    :
                                                    <div className={`in mbjellja${''}`}  style={{height: 100+'%'}}>
                                                    </div>
                                                } 
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        }
                        </div>
                        <div className='bottom'>
                        { 
                            shelf.map((element,index) =>
                                index>=21&&index<=42 &&
                                <React.Fragment>
                                    <div className={`shelf-box`}>
                                        <span className={`shelf-name`}>{index+1}</span>
                                        <div key={index} id='shelf' className={`shelf`} >
                                                {element.plants?
                                                    element.plants.map((plant,idx)=>
                                                    <React.Fragment>
                                                        <div key={idx} onClick={this.onPlantClick.bind(this, plant.plant_id)} onMouseMove={this.onMouseMove.bind(this,plant.plant_id, element.id)} onMouseLeave={this.removeClass.bind(this,plant.plant_id, element.id)} className={`in mbjellja${''}`}  style={{height: 100/element.plants.length+'%',backgroundColor:this.stringToColour(plant.plant_id)}}>
                                                        </div>
                                                        <div className={`info-popup ${plant.plant_id + ' ' + element.id}`} style={{top: x}}>
                                                            <span className="title">Bexhi: {plant.plant_id}</span>
                                                            <span className="content">Numri i bllokave {plant.nr_blocks}</span>
                                                        </div>
                                                    </React.Fragment>
                                                    )
                                                    :
                                                    <div className={`in mbjellja${''}`}  style={{height: 100+'%'}}>
                                                    </div>
                                                } 
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        }
                        </div>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <div className='top'>
                        { 
                            shelf.map((element,index) =>
                                index<=22 &&
                                <React.Fragment>
                                    <div className={`shelf-box growing-top`}>
                                        <span className={`shelf-name`}>{index+1}</span>
                                        <div key={index} id='shelf' className={`shelf`} >
                                                {element.plants?
                                                    element.plants.map((plant,idx)=>
                                                    <React.Fragment>
                                                        <div onClick={this.onPlantClick.bind(this, plant.plant_id)} key={idx} onMouseMove={this.onMouseMove.bind(this,plant.plant_id, element.id)} onMouseLeave={this.removeClass.bind(this,plant.plant_id, element.id)} className={`in mbjellja${''}`}  style={{height: 100/element.plants.length+'%',backgroundColor:this.stringToColour(plant.plant_id)}}>
                                                        </div>
                                                        <div className={`info-popup ${plant.plant_id + ' ' + element.id}`} style={{top: x}}>
                                                            <span className="title">Bexhi: {plant.plant_id}</span>
                                                            <span className="content">Numri i bllokave {plant.nr_blocks}</span>
                                                        </div>
                                                    </React.Fragment>
                                                    )
                                                    :
                                                    <div className={`in mbjellja${''}`}  style={{height: 100+'%'}}>
                                                    </div>
                                                } 
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        }
                        </div>
                        <div className='bottom'>
                        { 
                            shelf.map((element,index) =>
                                index>=23&&index<=47 &&
                                <React.Fragment>
                                    <div className={`shelf-box growing-bottom`}>
                                        <span className={`shelf-name`}>{index+1}</span>
                                        <div key={index} id='shelf' className={`shelf`} >
                                                {element.plants?
                                                    element.plants.map((plant,idx)=>
                                                    <React.Fragment>
                                                        <div key={idx} onClick={this.onPlantClick.bind(this, plant.plant_id)} onMouseMove={this.onMouseMove.bind(this,plant.plant_id, element.id)} onMouseLeave={this.removeClass.bind(this,plant.plant_id, element.id)} className={`in mbjellja${''}`}  style={{height: 100/element.plants.length+'%',backgroundColor:this.stringToColour(plant.plant_id)}}>
                                                        </div>
                                                        <div className={`info-popup ${plant.plant_id + ' ' + element.id}`} style={{top: x}}>
                                                            <span className="title">Bexhi: {plant.plant_id}</span>
                                                            <span className="content">Numri i bllokave {plant.nr_blocks}</span>
                                                        </div>
                                                    </React.Fragment>
                                                    )
                                                    :
                                                    <div className={`in mbjellja${''}`}  style={{height: 100+'%'}}>
                                                    </div>
                                                } 
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        }
                        </div>
                    </React.Fragment>
                }
            </React.Fragment>
         );
    }
}
 
export default withRouter(Shelf);