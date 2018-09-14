import React, { Component } from 'react';

export class AppFooter extends Component {

    render() {
        return  (
            <div className="layout-footer">
                <span className="footer-text" style={{'marginRight': '5px'}}>PrimeReact</span>
                <img src="assets/layout/images/logo.svg" alt="" width="80"/>
            </div>
        );
    }
}