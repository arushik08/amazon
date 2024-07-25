import React from "react";


const Footer : React.FC =() =>{
    const goToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };

      return(
        <>
        <div className="backtop">
          <span onClick={goToTop}>Back to Top</span>
        </div>
        <div className="detail">
          <div className="table">
            <div>
              <div className="t-head">Get to know us</div>
              <ul>
                <li>Careers</li>
                <li>Blog</li>
                <li>About Amazon</li>
                <li>Investor Relations</li>
                <li>Amazon Advices</li>
                <li>Amazon Science</li>
              </ul>
            </div>
            <div>
              <div className="t-head">Make Money with Us</div>
              <ul>
                <li>Sell products on Amazon</li>
                <li>Sell on Amazon Business</li>
                <li>Sell apps on Amazon</li>
                <li>Become an Affiliate</li>
                <li>Advertise Your Products</li>
                <li>Self-Publish with Us</li>
                <li>Host on Amazon Hub</li>
              </ul>
            </div>
            <div>
              <div className="t-head">Amazon Payment Products</div>
              <ul>
                <li>Amazon Business Card</li>
                <li>Shop with Points</li>
                <li>Reload Your Balance</li>
                <li>Amazon Currency Converter</li>
              </ul>
            </div>
            <div>
              <div className="t-head">Let Us Help You</div>
              <ul>
                <li>Amazon and COVID-19</li>
                <li> Account</li>
                <li>Your Orders</li>
                <li>Shipping Rates &amp; Policies</li>
                <li>Returns &amp; Replacements</li>
                <li>Manage Your Content and Devices</li>
                <li>Amazon Assistant</li>
                <li>Help </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="line">
          <hr />
        </div>
        <div className="copy">
          <span>© Designed by Arushi Kansal</span>
        </div>
        </>
      )
}

export default Footer;