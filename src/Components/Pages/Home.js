import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';
import FeaturedPost from './FeaturedPost'; // Adjust the path as necessary
import ContactUs from './ContactUs'; // Adjust the path as necessary
import { fetchPageData } from '../../api'; // Adjusted the import path
import Slider from 'react-slick';
import parse from 'html-react-parser';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // Import the styles



const Home = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPageData('home');
        setContent(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const sanitizeTitle = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]/g, '_');
  };
  if (loading) return <div className="loader"><img src="http://122.160.55.196:4344/matrixtraining/wp-content/uploads/2024/05/cupertino_activity_indicator_square_medium.gif" alt="Loading" /></div>;
  if (error) return <p>Error: {error}</p>;
  const images = []; // Collect images for lightbox
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <Header />
      {content && content.map(page => (
        <div key={page.id} className={`${sanitizeTitle(page.slug)}_layout`}>
          <section className="page_title">
            <div className="container">
              <div className="row">
                {/* Render the page title */}
                {page.title && (
                  <h1 className="page-title">{page.title.rendered}</h1>
                )}
              </div>
            </div>
          </section>
          {page.acf && page.acf._blocks && page.acf._blocks.map((block, index) => {
            switch (block.acf_fc_layout) {
              case '_text_block':
                return (
                  <section className="our-services-section" key={index}>
                    <div className="container">
                      <div className="row mb-4">
                        {block._multiple_text_block && (
                            <div className="topSection">
                              <h2>{block._multiple_text_block._heading}</h2>
                              <div className='heading-bottom-line'></div>
                              {parse(block._multiple_text_block._description)}
                            </div>
                        )}
                        {/* {block._multiple_text_block && (
                            <div className="middenSection row">
                                <div className="textarea col-md-6">
                                    <h2>{block._multiple_text_block._heading_two}</h2>
                                    {parse(block._multiple_text_block._description_two)}
                                </div>
                                <div className="image col-md-6">
                                    <img src={block._multiple_text_block.image.url} alt={block._multiple_text_block.image.alt || ''} className="img-fluid" />
                                </div>
                            </div>
                        )}
                        {block._multiple_text_block && (
                            <div className="bottomSection">
                                <h2>{block._multiple_text_block._heading_three}</h2>
                                {parse(block._multiple_text_block._description_three)}
                            </div>
                        )} */}
                      </div>
                    </div>
                  </section>
                );
                case '_course_list':
                    return (
                      <section className="course_block" key={index}>
                        <div className="container">
                          <div className="row mb-4">
                            {block.heading && (
                                <div className="course_heading">
                                    <h2>{block.heading}</h2>
                                </div>
                            )}
                            {block._course_list_block.map((list, courseIndex) => (
                              <div key={courseIndex} className="col-md-6 course-list">
                                <h2>{list._name}</h2>
                                {parse(list._course_list)}
                              </div>
                            ))}
                          </div>
                        </div>
                      </section>
                  );
                  case '_testimonials_section':
                    return (
                      <section className="testmonial-wrapper" key={index}>
                        <div className="container">
                          <div className="row mb-4">
                            {block.heading && (
                                <div className="testmonial-title">
                                    <h2>{block.heading}</h2>
                                    <div className='heading-bottom-line'></div>
                                </div>
                            )}
                            <Slider {...settings} className="testmonial-slider">
                              {block._add_testimonials.map((item, index) => (
                                <div key={index} className="p-4">
                                  {parse(item._description)}
                                  <div className='testi-auth-bx'>
                                  {item._author_image && <img src={item._author_image.url} alt={item._author_image.alt} className="img-fluid my-2" />}
                                  <span>{item._name}</span>
                                  </div>
                                </div>
                              ))}
                            </Slider>
                          </div>
                        </div>
                      </section>
                  );
                  case '_button_with_text':
                    return (
                      <section className="buttonText_section" key={index}>
                        <div className="container">
                          <div className="row mb-4 bt_block">
                            {block._text && (
                                <div className="bt_heading">
                                    <p>{block._text}</p>
                                </div>
                            )}
                            {block._button_name && (
                                <div className="bt_button">
                                    <a href={block._button_url}>{block._button_name}</a>
                                </div>
                            )}
                          </div>
                        </div>
                      </section>
                  );
                  case 'text_with_bg_image':
                    return (
                      <section id={block._add_section_id} className="inds-train-section" key={index} style={block._bg_image ? { backgroundImage: `url(${block._bg_image.url})` } : {}}>
                        <div className="container">
                          <div className="mb-4 textBg_block">
                            {block._heading && (
                                <div className="textBg_heading">
                                    <h2>{block._heading}</h2>
                                    <div className='heading-bottom-line'></div>
                                </div>
                            )}
                             {block._description && (
                                <div className="textBg_description">
                                    {parse(block._description)}
                                </div>
                            )}
                          </div>
                        </div>
                      </section>
                  );
                  case '_image_with_content':
                    return (
                      <section className="who-we-are-section">
                        <div className="container">
                          <div className="row mb-4 textwC_block">
                            <div className="col-md-6 mb-4 textwC_img">
                              <div className="_img">
                                  <img src={block._image} alt={block._image.alt} className="img-fluids" />
                              </div>
                            </div>
                            <div className="col-md-6 mb-4 textwC_con">
                              <div className='who-we-are-content-bx'>
                              {block._heading && (
                                  <div className="_heading">
                                      <h2>{block._heading}</h2>
                                  </div>
                              )}
                              {block._description && (
                                  <div className="_content">
                                      {parse(block._description)}
                                  </div>
                              )}
                              {block._button_name && (
                                  <div className="_button_name">
                                      <a href={block._button_url}>{block._button_name}</a>
                                  </div>
                              )}
                            </div>
                            </div>
                          </div>
                        </div>
                      </section>
                  );
                  case '_get_in_touch':
                    return (
                      <section className="git_section" key={index}>
                        <div className="container">
                          <div className="row mb-4 git_block">
                            <div className="mb-4 git_con">
                              {block._heading && (
                                  <div className="_heading">
                                      <h2>{block._heading}</h2>
                                      <div class="heading-bottom-line"></div>                                  </div>
                              )}
                              {block._description && (
                                  <div className="_content">
                                      {parse(block._description)}
                                  </div>
                              )}
                              {block._button_name && (
                                  <div className="_button_name">
                                      <a href={block._button_url}>{block._button_name}</a>
                                  </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </section>
                  );
                  case '_hero_section':
                    return (
                      <section className="hero_section">
                        <Slider {...settings} className="hero-slider mb-4">
                            {block._hero_slider.map((slide, index) => (
                              <div key={index} className="slide">
                                  {slide._image && <img src={slide._image.url} alt={slide._image.alt} className="img-fluid" />}
                              </div>
                            ))}
                        </Slider>
                      </section>
                  );
                  case '_service_section':
                    return (
                      <section className="service_block">
                        <div key={page.id} className="container">
                          <div className="service-wrapper">
                            {block._service_block.map((items, index) => (
                             <div key={index} className="service-item">
                                  {items._icon && <img src={items._icon.url} alt={items._icon.alt} className="img-fluid" />}
                                  <h2>{items._heading}</h2>
                              </div>
                            ))}
                          </div>
                        </div>
                      </section>
                  );
                  case '_gallery_section':
                    return (
                      <section className="gallery_block" key={index}>
                        <div className="container">
                          <div className="row mb-4">
                            {block._select_Image.map((gallery, galleryIndex) => {
                              images.push(gallery._image.url); // Collect images for lightbox
                              return (
                                <div key={galleryIndex} className="gallery_item col-md-4 mb-4" onClick={() => { setPhotoIndex(galleryIndex); setIsOpen(true); }}>
                                  {gallery._image && <img src={gallery._image.url} alt={gallery._image.alt} className="img-fluid" />}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </section>
                    );
                    case '_contact_block':
                      return (
                        <section className="contact_block" key={index}>
                          <div className="container">
                            <div className="row mb-4">
                              {block._address_block && (
                                  <div className="_address_block col-md-6">
                                      {parse(block._address_block)}
                                  </div>
                              )}
                              <ContactUs/>
                            </div>
                          </div>
                        </section>
                      );
                    case '_show_featured_post':
                    return block._post ? <FeaturedPost key={index} /> : null;
              default:
              return null;
            }
          })}
        </div>
      ))}
      <Footer />
      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
        />
      )}
    </>
  );
};

export default Home;
