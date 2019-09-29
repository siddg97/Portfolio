import React, { Component } from 'react';
import './App.css';
import {Link, Route} from "react-router-dom";
import {Switch as RouteSwitch} from 'react-router-dom';
import { Affix, Row, Col, Button, Drawer, Layout, Menu, Icon, BackTop, Tooltip } from 'antd';
import Home from './Home.jsx'
import About from './About.jsx'
import Portfolio from './Portfolio.jsx'
import Contact from './Contact.jsx'

const { Footer, Header } = Layout;

class App extends Component {
	constructor(){
		super();
		let curr_path = window.location.pathname;
		const path_map = {};
		path_map['/']='Home';
		path_map['/about']='About';
		path_map['/portfolio']='Portfolio';
		path_map['/contact']='Contact';
		this.state = {
			nav: false,
			selectedKeys:[path_map[curr_path]],
			title:path_map[curr_path],
		};
	}

	handleMenuClick = e => {
		this.setState({
			selectedKeys:e.keyPath,
			nav:false,
			title:e.key
		});
		window.scrollTo(0,0);
	};

	showNav = () => {
		this.setState({nav:true});
	};

	hideNav = () => {
		this.setState({nav:false});
	};

	render() {
		let hmode = window.screen.width < 580 ? "left" : "alternate";
		const mItemStyle = {height:'140px',padding:24,textAlign:'center',margin:0};
		const iconStyle = {"fontSize":"50px",marginRight:0}
		return (
			<div className="App">
				<Tooltip title="Top of page">
					<BackTop visibilityHeight={50}>
						<Button type="primary" size='large' shape="circle"><Icon type="up-circle"/></Button>
					</BackTop>
				</Tooltip>
				<Layout>
					<Affix>
					<Header style={{paddingLeft:16, height:'auto'}}>
						<Button type="primary" size='large' shape="circle" onClick={this.showNav}><Icon type="menu" /></Button>
						<Drawer placement='left' closable={false} onClose={this.hideNav} visible={this.state.nav} width={150}>
							<Menu theme="dark" mode="inline" selectedKeys={this.state.selectedKeys} style={{minHeight:'100vh'}}>
								<Menu.Item key="Home" onClick={this.handleMenuClick} style={mItemStyle}>
									<Link to="/">
										<Icon type="home" style={iconStyle} /><br/>
										<span className="nav_Text">Home</span>
									</Link>
								</Menu.Item>
								<Menu.Item key="About" onClick={this.handleMenuClick} style={mItemStyle}>
									<Link to="/about">
										<Icon type="user" style={iconStyle} /><br/>
										<span className="nav_Text">About</span>	
									</Link>
								</Menu.Item>
								<Menu.Item key="Portfolio" onClick={this.handleMenuClick} style={mItemStyle}>
									<Link to="/portfolio">
										<Icon type="area-chart" style={iconStyle} /><br/>
										<span className="nav_Text">Portfolio</span>
									</Link>
								</Menu.Item>
								<Menu.Item key="Contact" onClick={this.handleMenuClick} style={mItemStyle}>
									<Link to="/contact">
										<Icon type="message" style={iconStyle} /><br/>
										<span className="nav_Text">Contact</span>
									</Link>
								</Menu.Item>
							</Menu>
						</Drawer>
						<span className="nav_Header">{' '+this.state.title}</span>
					</Header>
					</Affix>
				<Layout>
						<RouteSwitch>
							<Route exact path="/" render={(props) => <Home {...props} mode={hmode} />} />
							<Route path="/about" component={About} />
							<Route path="/portfolio" component={Portfolio} />
							<Route path="/contact" component={Contact} />
						</RouteSwitch>
						<Footer style={{backgroundColor:'black',paddingLeft:24, paddingRight:24}}>
							<Row type="flex" align="middle">
								<Col xs={24} sm={24} md={4}>
									<Menu theme="dark" mode="inline" selectedKeys={this.state.selectedKeys}>
										<Menu.Item key="Home" onClick={this.handleMenuClick}>
												<Link to="/">
													<span className="footer-nav-text">Home</span>
												</Link>
										</Menu.Item>
										<Menu.Item key="About" onClick={this.handleMenuClick}>
												<Link to="/about">
													<span className="footer-nav-text">About</span>
												</Link>
										</Menu.Item>
										<Menu.Item key="Portfolio" onClick={this.handleMenuClick}>
												<Link to="/portfolio">
													<span className="footer-nav-text">Portfolio</span>
												</Link>
										</Menu.Item>
										<Menu.Item key="Contact" onClick={this.handleMenuClick}>
												<Link to="/contact">
													<span className="footer-nav-text">Contact</span>
												</Link>
										</Menu.Item>
									</Menu>
								</Col>
								<Col xs={24} sm={24} md={20}>
									<div style={{textAlign:'center',padding:32}}>
										<a href="https://github.com/siddg97/" className="hvr-float logo-invert" target="_blank" rel="noopener noreferrer"><Icon theme="outlined" type="github" style={{"fontSize":"40px",color:'black'}}/></a>
										<a href="https://www.facebook.com/siddharth.gupta.1997" className="hvr-float logo-invert" target="_blank" rel="noopener noreferrer"><Icon theme="filled" type="facebook" style={{"fontSize":"40px", color: 'black'}}/></a>
										<a href="https://www.linkedin.com/in/siddharth-gupta-b0245b113/" className="hvr-float logo-invert" target="_blank" rel="noopener noreferrer"><Icon theme="filled" type="linkedin" style={{"fontSize":"40px", color: 'black'}}/></a>
										<br/><br/>
										<span style={{color:'#fff',fontSize:16}}>Created with <Icon type="heart" theme="filled" style={{color:'red',fontSize:28}} className="hvr-pop"/> by - <a href="http://siddg.info" target="_blank" rel="noopener noreferrer">Siddharth Gupta</a> © 2019</span><br/>
										<span style={{color:'#fff',fontSize:16}}> Powered by <a href="https://ant.design/" target="_blank" rel="noreferrer noopener">Antd{" "}<Icon type="ant-design" style={{color:"white",fontSize:28}} className="hvr-pop"/></a></span>
										<br/>
										<span style={{color:'#fff',fontSize:10,bottom:0}}> Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik" target="_blank" rel="noopener noreferrer">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon" target="_blank" rel="noopener noreferrer">www.flaticon.com</a></span>
									</div>
								</Col>
							</Row>
						</Footer>
					</Layout>
				</Layout>
			</div>
		);
	}
}

export default App;
