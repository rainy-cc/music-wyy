import React from 'react';



class CarouselImg extends React.Component {
    render(){
        return (
            <a target="_blank" className={this.props.isActive} href={this.props.href}>
                <img src={this.props.src} alt={this.props.alt} />
            </a>
        );
    }
}


export default CarouselImg;
