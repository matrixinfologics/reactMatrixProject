import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Footer = () => {
  const [widgets, setWidgets] = useState([]);

  useEffect(() => {
    const fetchWidgets = async () => {
      try {
        const response = await axios.get('http://122.160.55.196:4344/matrixtraining/wp-json/wp/v2/widgets');
        setWidgets(response.data);
      } catch (error) {
        console.error('Error fetching widgets:', error);
      }
    };

    fetchWidgets();
  }, []);

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4 footer-widget footer-1">
            {widgets.filter(widget => widget.sidebar === 'footer-1').map(widget => (
              <div key={widget.id} dangerouslySetInnerHTML={{ __html: widget.rendered }} />
            ))}
          </div>
          <div className="col-md-4 footer-widget footer-3">
            {widgets.filter(widget => widget.sidebar === 'footer-3').map(widget => (
              <div key={widget.id} dangerouslySetInnerHTML={{ __html: widget.rendered }} />
            ))}
          </div>
          <div className="col-md-4 footer-widget footer-4">
            {widgets.filter(widget => widget.sidebar === 'footer-4').map(widget => (
              <div key={widget.id} dangerouslySetInnerHTML={{ __html: widget.rendered }} />
            ))}
          </div>
        </div>
        <div class="row bottomFotter">
          <div className="col-md-12 copyright">
            {widgets.filter(widget => widget.sidebar === 'bottom-footer').map(widget => (
              <div key={widget.id} dangerouslySetInnerHTML={{ __html: widget.rendered }} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
