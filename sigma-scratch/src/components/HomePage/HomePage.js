import React, { Component } from 'react';
import classNames from 'classnames';
import { AppTopbar } from '../../AppTopbar';
import { AppFooter } from '../../AppFooter';
import { AppMenu } from '../../AppMenu';
import { AppInlineProfile } from '../../AppInlineProfile';
import { Route } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import { CreateUser } from './CreateUser';
import { ViewUsers } from './ViewUsers';
import { ScrollPanel } from 'primereact/components/scrollpanel/ScrollPanel';
import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'fullcalendar/dist/fullcalendar.css';
import 'font-awesome/css/font-awesome.css';
import '../../App.css';
import '../../layout/layout.css';

class HomePage extends Component {

	constructor() {
		super();
		this.state = {
			layoutMode: 'static',
			layoutColorMode: 'light',
			staticMenuInactive: false,
			overlayMenuActive: false,
			mobileMenuActive: false
		};

		this.onWrapperClick = this.onWrapperClick.bind(this);
		this.onToggleMenu = this.onToggleMenu.bind(this);
		this.onSidebarClick = this.onSidebarClick.bind(this);
		this.onMenuItemClick = this.onMenuItemClick.bind(this);
		this.createMenu();
	}

	onWrapperClick(e) {
		if (!this.menuClick) {
			this.setState({
				overlayMenuActive: false,
				mobileMenuActive: false
			});
		}

		this.menuClick = false;
	}

	onToggleMenu(e) {
		this.menuClick = true;

		if (this.isDesktop()) {
			if (this.state.layoutMode === 'overlay') {
				this.setState({
					overlayMenuActive: !this.state.overlayMenuActive
				});
			}
			else if (this.state.layoutMode === 'static') {
				this.setState({
					staticMenuInactive: !this.state.staticMenuInactive
				});
			}
		}
		else {
			const mobileMenuActive = this.state.mobileMenuActive;
			this.setState({
				mobileMenuActive: !mobileMenuActive
			});

			if (mobileMenuActive)
				this.removeClass(document.body, 'body-overflow-hidden');
			else
				this.addClass(document.body, 'body-overflow-hidden');
		}

		e.preventDefault();
	}

	onSidebarClick(e) {
		this.menuClick = true;
		setTimeout(() => {this.layoutMenuScroller.moveBar();}, 500);
	}

	onMenuItemClick(e) {
		if (!e.item.items) {
			this.setState({
				overlayMenuActive: false,
				mobileMenuActive: false
			});
		}
	}

	createMenu() {
		this.menu = [
			{
				label: 'Dashboard', 
				icon: 'fa fa-fw fa-home', 
				command: () => { window.location = '#/' }
			},
			{
				label: 'Account Management',
				icon: 'fa fa-fw fa-users',
				items: [
					{label: 'Create User', icon: 'fa fa-fw fa-user-plus', command: () => { window.location = '#/create-user' }},
					{label: 'View Users', icon: 'fa fa-fw fa-table', command: () => { window.location = '#/view-users' }}
				]
			},
			{
				label: 'Audit Logs',
				icon: '',
				items: [
					{label: 'User Logs', icon: '', command: () => { window.location ='#/user-logs' }}
				]
			}
		];
	}

	addClass(element, className) {
		if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
	}

	removeClass(element, className) {
		if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	}

	isDesktop() {
		return window.innerWidth > 1024;
	}

	render() {
		let wrapperClass = classNames('layout-wrapper', {
			'layout-overlay': this.state.layoutMode === 'overlay',
			'layout-static': this.state.layoutMode === 'static',
			'layout-static-sidebar-inactive': this.state.staticMenuInactive && this.state.layoutMode === 'static',
			'layout-overlay-sidebar-active': this.state.overlayMenuActive && this.state.layoutMode === 'overlay',
			'layout-mobile-sidebar-active': this.state.mobileMenuActive
		});

		let sidebarClassName = classNames('layout-sidebar', {
			'layout-sidebar-dark': this.state.layoutColorMode === 'dark'
		});

		return (
			<div className={wrapperClass} onClick={this.onWrapperClick}>
				<AppTopbar onToggleMenu={this.onToggleMenu} />

				<div ref={(el) => this.sidebar = el} className={sidebarClassName} onClick={this.onSidebarClick}>
					<ScrollPanel ref={(el) => this.layoutMenuScroller = el} style={{height: '100%'}}>
						<div className='layout-sidebar-scroll-content'>
							<div className='logo'></div>
							<AppInlineProfile />
							<AppMenu model={this.menu} onMenuItemClick={this.onMenuItemClick} />
						</div>
					</ScrollPanel>
				</div>

				<div className='layout-main'>
					<Route path='/' exact component={Dashboard} />
					<Route path='/create-user' component={CreateUser} />
					<Route path='/view-users' component={ViewUsers} />
				</div>

				<AppFooter />

				<div className='layout-mask'></div>
			</div>
		);
	}

}

export default HomePage;