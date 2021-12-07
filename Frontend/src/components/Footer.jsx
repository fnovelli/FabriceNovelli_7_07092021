import React from "react";
import './styles/footer.css'

function Footer() {
  return (

    <div id="footerBlock">
                <div className="footMenu">

                    <div className="footBlockLine">

                        <a href='/#' className="fLine">Conditions of Use</a></div>
                    <div className="footBlockLine">

                        <a href='/#' className="fLine">Privacy Notice</a>
                        <a href="mailto:Groupomania-support@group.com" className="fLine">Contact us</a>
                        
                    </div>  
                </div>    
            </div>
  );
}

export default Footer;