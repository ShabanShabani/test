import React, { Component } from 'react';
import LeftMenu from '../left-menu/left-menu';
import NavMenu from '../nav-menu/nav-menu';
import SecondChart from './charts/second-chart';
import FirstChart from './charts/first-chart';
import ThirdChart from './charts/third-chart';
import RaportTable from './table';
import temperatureService from '../../services/temperatureService';
import { getLanguage } from '../global/language';

class Raporti extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            free: 0,
            not_free: 0
        };
    }

    pasButton = () =>
    {
        document.body.classList.add('reports-body');
        let onclick = document.getElementsByClassName('MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit')
        onclick[0].click()
        let millisecondsToWait = 500;
        setTimeout(function() {
            let role = document.querySelectorAll('[role="presentation"]')
            if(role[1])
            {
                role[1].classList.add("active-role")
                role[1].childNodes[0].classList.add('active-role-second')
                role[3].style.width = "0px"
                role[3].style.height = "0px"
                role[3].childNodes[0].style.width = "0px"
                role[3].childNodes[0].style.height = "0px"
            }
        }, millisecondsToWait);
    }    

    getButton = () => {
        let li = document.getElementsByClassName('MuiButtonBase-root MuiListItem-root MuiMenuItem-root MuiMenuItem-gutters MuiListItem-gutters MuiListItem-button')
        if(li[0])
        {
            li[0].click()
        }
        document.body.classList.add('reports-body');
        let onclick = document.getElementsByClassName('MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit')
        onclick[0].click()
        
        var millisecondsToWait = 500;
        setTimeout(function() {
            let role = document.querySelectorAll('[role="presentation"]')
            if(role[1])
            {
                role[1].classList.add("active-role")
                role[1].childNodes[0].classList.add('active-role-second')
            }
        }, millisecondsToWait);
    }
    
    componentDidMount(){
        temperatureService.getAvgDays().then(({ data : response }) => {
            this.setState({
                data:[].concat(response)
            })
        })

        temperatureService.getAvgShelfs().then(({ data : response }) => {
            this.setState({
                free: response.free,
                not_free: response.not_free,
            })
        })
    }

    render() { 
        const { data, free, not_free } = this.state;
        return (
            <React.Fragment>
                <LeftMenu />
                <NavMenu />
                {/* <RightPart /> */}
                <div id="raporti" className={`main`} >
                    <div className={`first-raporti`}>
                        {/* <div className={`first-chart`}>
                            <FirstChart data={data} />
                        </div> */}
                        <div className={`second-chart`}>
                            <SecondChart free={free} not_free={not_free} />
                        </div>
                        <div className={`third-chart`}>
                            <ThirdChart data={data} />
                        </div>
                    </div>
                    <div className={`second-raporti`}>
                        <RaportTable 
                            pasButton={this.pasButton}
                        />
                    </div>
                    <div className={`add-button`}>
                        <div onClick={this.getButton} className={``}>
                            <span>{getLanguage().generate_report}</span>
                        </div>
                        <div onClick={this.getButton} className={``}>
                            <img src="./assets/img/download.svg" alt=""/>
                        </div>
                    </div>
                </div>
            </React.Fragment>
          );
    }
}
 
export default Raporti;