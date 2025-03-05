<script setup>
import Animation from '@/components/FixAnimation.vue'
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper';

// ایمپورت استایل‌های Swiper
import 'swiper/css';
import 'swiper/css/autoplay';

// داده‌های اسلایدها
import project1Image from '@/assets/img/project/project1/1.jpg';
import project2Image from '@/assets/img/project/project1/6.jpg';
import project3Image from '@/assets/img/project/project1/3.jpg';
import project4Image from '@/assets/img/project/project1/4.jpg';
import project5Image from '@/assets/img/project/project1/5.jpg';

const slides = ref([
  { image: project1Image, title: 'Slide 1' },
  { image: project2Image, title: 'Slide 2' },
  { image: project3Image, title: 'Slide 3' },
  { image: project4Image, title: 'Slide 4' },
  { image: project5Image, title: 'Slide 5' },
]);

// Swiper moduls
const modules = [Autoplay];

// Responsive setting
const breakpoints = {
  // > 320px
  320: {
    slidesPerView: 1,
    spaceBetween: 10,
  },
  // > 640px
  640: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  // > 1024px
  1024: {
    slidesPerView: 3,
    spaceBetween: 30,
  },
};

// swiper intial
const onSwiper = (swiper) => {
  console.log('Swiper initialized:', swiper);
};

</script>

<template>
  <!-- header -->
  <header dir="rtl">
    <div class="header-hero header-hero-2" data-dsn-header="project">
      <div id="descover-holder" class="bg-circle-dotted"></div>

      <div class="container h-100">
        <div class="row align-items-center h-100 w-100">
          <div class="col-lg-12">
            <div class="contenet-hero" id="dsn-hero-parallax-title">
              <h1>DIGITAL CREATIVE</h1>
              <p>We Bring Ideas To Life</p>
              <div class="link-custom">
                <a href="project-9.html" class="image-zoom effect-ajax" data-dsn="parallax" data-dsn-ajax="slider">
                  <span>Let's See Products</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <!-- end header -->
  <div class="wrapper">
    <section class="our-work work-under-header section-margin" data-dsn-col="3">
      <div class="container">
        <div class="one-title">
          <div class="title-sub-container">
            <p class="title-sub">Our Work</p>
          </div>
          <h2 class="title-main" data-dsn-animate="up">پروژه های اخیر</h2>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-9 offset-lg-3">
            <div class="work-container">
              <swiper :modules="modules" :autoplay="{ delay: 3000, disableOnInteraction: true }" :loop="true"
                :breakpoints="breakpoints" @swiper="onSwiper">
                <swiper-slide class="work-item" v-for="(slide, index) in slides" :key="index">
                  <img :src="slide.image" :alt="slide.title" class="slide-image has-top-bottom" />
                  <div class="item-border"></div>
                  <div class="item-info">
                    <a href="project-5.html" data-dsn-grid="move-up" class="effect-ajax">

                      <h3 class="slide-title">{{ slide.title }}</h3>
                      <span><span>Veiw Project</span></span>
                    </a>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- end swiper -->
    <!-- end recommended projects -->
    <!-- video -->
    <div class="box-seat">
      <div class="dsn-v-text">
        <div class="container-fluid">
          <div class="box-middle-text">
            <h2 data-dsn-animate="text">People a Lift</h2>
            <p data-dsn-animate="text">When the Escalators Died in Stockholm's Subway, Reebok Was
              There to Give People a Lift.Literally</p>
            <a href="https://vimeo.com/175353205" class="vid">
              <div class="play-button">
                <div class="play-btn">
                  <i class="fas fa-play"></i>
                </div>
              </div>
            </a>
          </div>
          <div class="inner-img" data-dsn-grid="move-up" data-overlay="9">
            <img class="has-top-bottom" src="@/assets/img/skills-2.jpg" alt="">
          </div>
        </div>
      </div>
    </div>
    <!-- end video -->
    <!-- parent category -->
    <section class="our-work work-under-header">
      <div class="pt-25 pb-35 box-gallery-vertical">
        <div class="mask-bg w-100"></div>
        <div class="container">
          <div class="one-title mb-0">
            <h2 class="title-main" data-dsn-animate="up">خدمات ما</h2>
          </div>
        </div>
        <div class="container-fluid">
          <div class="row p-2 align-items-center h-100">
            <!-- <div class="gallery-portfolio"> -->
            <a class="col-lg-6 col-xl-4 p-2" href="https://google.com">
              <img src="@/assets/img/project/project4/6.jpg" alt="">
              <div class="cap">
                <span>Web Design</span>
              </div>
            </a>
            <a class="col-lg-6 col-xl-4 p-2" href="https://google.com"
              data-source="@/assets/img/project/project4/7.jpg">
              <img src="@/assets/img/project/project4/7.jpg" alt="">
              <div class="cap">
                <span>Web Design</span>
              </div>
            </a>

            <a class="col-lg-6 col-xl-4 p-2" href="https://google.com"
              data-source="@/assets/img/project/project4/8.jpg">
              <img src="@/assets/img/project/project4/8.jpg" alt="">
              <div class="cap">
                <span>Web Design</span>
              </div>
            </a>

            <a class="col-lg-6 col-xl-4 p-2" href="https://google.com"
              data-source="@/assets/img/project/project4/9.jpg">
              <img src="@/assets/img/project/project4/9.jpg" alt="">
              <div class="cap">
                <span>Web Design</span>
              </div>
            </a>

            <a class="col-lg-6 col-xl-4 p-2" href="https://google.com"
              data-source="@/assets/img/project/project4/10.jpg">
              <img src="@/assets/img/project/project4/10.jpg" alt="">
              <div class="cap">
                <span>Web Design</span>
              </div>
            </a>

            <a class="col-lg-6 col-xl-4 p-2" href="https://google.com"
              data-source="@/assets/img/project/project4/11.jpg">
              <img src="@/assets/img/project/project4/11.jpg" alt="">
              <div class="cap">
                <span>Web Design</span>
              </div>
            </a>

            <a class="col-lg-6 col-xl-4 p-2" href="https://google.com"
              data-source="@/assets/img/project/project4/12.jpg">
              <img src="@/assets/img/project/project4/12.jpg" alt="">
              <div class="cap">
                <span>Web Design</span>
              </div>
            </a>

            <!-- </div> -->
          </div>
        </div>
      </div>
    </section>

    <!-- end parent category -->
    <!-- about us -->
    <div class="box-seat box-seat-full" data-dsn="color">
      <div class="container-fluid">
        <div class="inner-img" data-dsn-grid="move-up">
          <img src="@/assets/img/pexels.jpg" alt="" data-dsn-y="30%" data-dsn-scale="1">
        </div>
        <div class="pro-text">
          <h3 data-dsn-animate="up">Hello we are, <br> Dsn Grid.</h3>
          <p data-dsn-animate="up">Founded in 2000, Dsn Grid has become one of the best
            Digital
            Agency in
            ThemeForest.
            Blue money going forward, but deploy to production. C-suite. First-order optimal
            strategies build on a culture of contribution and inclusion so those options

          </p>
        </div>
      </div>
    </div>
    <!-- end about us -->
    <!-- FAQ -->
    <section class="our-services section-margin w-100">
      <div class="container">
        <div class="one-title">
          <h2 class="title-main">New Branding Agency</h2>
        </div>

        <div class="row">
          <div class="col-lg-6">
            <div class="services-item">
              <div class="line-before"></div>
              <h4 class="subtitle">Brand Identity</h4>
              <p>As Vintage decided to have a closer look into fast-paced New York web design
                realm in person, we get to acquaint with most diverse and exceptionally
                captivating personalities. </p>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="services-item">
              <div class="line-before"></div>
              <h4 class="subtitle">Brand Identity</h4>
              <p>As Vintage decided to have a closer look into fast-paced New York web design
                realm in person, we get to acquaint with most diverse and exceptionally
                captivating personalities. </p>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="services-item">
              <div class="line-before"></div>
              <h4 class="subtitle">Brand Identity</h4>
              <p>As Vintage decided to have a closer look into fast-paced New York web design
                realm in person, we get to acquaint with most diverse and exceptionally
                captivating personalities. </p>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="services-item">
              <div class="line-before"></div>
              <h4 class="subtitle">Brand Identity</h4>
              <p>As Vintage decided to have a closer look into fast-paced New York web design
                realm in person, we get to acquaint with most diverse and exceptionally
                captivating personalities. </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- end FAQ -->
    <!-- our team -->
    <section class="our-team our-team-not-bg section-margin section-padding">
      <div class="container">
        <div class="one-title">
          <div class="title-sub-container">
            <p class="title-sub">our team</p>
          </div>
          <h2 class="title-main">The best team ever!</h2>
        </div>

        <div class="custom-container">
          <div class="slick-slider">
            <div class="team-item slick-slide">
              <div class="box-img">
                <img src="@/assets/img/team/1.png" alt="">
              </div>

              <div class="box-content">
                <h4>Blake Hamilton</h4>
                <p>Project manager</p>
              </div>
            </div>

            <div class="team-item slick-slide">
              <div class="box-img">
                <img src="@/assets/img/team/2.png" alt="">
              </div>

              <div class="box-content">
                <h4>Ahmed Shawky</h4>
                <p>Web Designer</p>
              </div>
            </div>

            <div class="team-item slick-slide">
              <div class="box-img">
                <img src="@/assets/img/team/3.png" alt="">
              </div>

              <div class="box-content">
                <h4>John Doe</h4>
                <p>Engineer</p>
              </div>
            </div>

            <div class="team-item slick-slide">
              <div class="box-img">
                <img src="@/assets/img/team/4.png" alt="">
              </div>

              <div class="box-content">
                <h4>Hesham Megahed</h4>
                <p>Founder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- end our team -->
    <!-- contact us -->
    <div class="container section-margin">
      <div class="row" dir="rtl">
        <div class="col-lg-6">
          <div class="box-info-contact">
            <h3>Start a new project?</h3>
            <h5>Visit our studio at</h5>
            <p>Sed ut perspiciatis unde omnis iste natus error sit vo
              luptatem accusantium natus error sit omnis iste natus</p>

            <ul>
              <li class="d-flex justify-content-between">
                <span>Phone</span>
                <a href="#">+1 (800) 990 8877</a>
              </li>
              <li class="d-flex justify-content-between">
                <span>Email</span>
                <a href="#">info@example.com</a>
              </li>
              <li class="d-flex justify-content-between">
                <span>Address</span>
                <a href="#">778 NE 84th St Miami, FL</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-box">
            <h3>Write A Comment</h3>
            <form id="contact-form" class="form" method="post" action="contact.php" data-toggle="validator">
              <div class="messages"></div>
              <div class="input__wrap controls">
                <div class="form-group">

                  <div class="entry">
                    <label>What's your name?</label>
                    <input id="form_name" type="text" name="name" class="text-left" placeholder="Type your name"
                      required="required" data-error="name is required.">
                  </div>
                  <div class="help-block with-errors"></div>
                </div>

                <div class="form-group">
                  <div class="entry">
                    <label>What's your email address?</label>
                    <input id="form_email" type="email" name="email" class="text-left"
                      placeholder="Type your Email Address" required="required" data-error="Valid email is required.">
                  </div>
                  <div class="help-block with-errors"></div>
                </div>

                <div class="form-group">
                  <div class="entry">
                    <label>What's up?</label>
                    <textarea id="form_message" class="form-control text-left" name="message"
                      placeholder="Tell us about you and the world" required="required"
                      data-error="Please,leave us a message."></textarea>
                  </div>
                  <div class="help-block with-errors"></div>
                </div>

                <div class="image-zoom" data-dsn="parallax">
                  <button>Send Message</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- end contact us -->
    <!-- latest blog -->
    <section class="our-news section-margin">
      <div class="container">
        <div class="one-title" data-dsn-animate="up">
          <div class="title-sub-container">
            <p class="title-sub">Latest News</p>
          </div>
          <h2 class="title-main">Latest and greatest post</h2>
        </div>
        <div class="custom-container">
          <div class="slick-slider">
            <div class="item-new slick-slide">
              <div class="image" data-overlay="5">
                <img src="@/assets/img/blog/1.jpg" alt="">
              </div>
              <div class="content">
                <div class="background"></div>
                <h5>Web , Brand</h5>

                <div class="cta">
                  <a href="#">Digital Photography Tips</a>
                </div>

                <p>Simple point-and-shoot digital cameras can give surprising quality when they
                  have the right lenses and sensors.</p>

              </div>
            </div>

            <div class="item-new slick-slide">
              <div class="image" data-overlay="5">
                <img src="@/assets/img/blog/2.jpg" alt="">
              </div>
              <div class="content">
                <div class="background"></div>
                <h5>Web , Brand</h5>

                <div class="cta">
                  <a href="#">Digital Photography Tips</a>
                </div>

                <p>Simple point-and-shoot digital cameras can give surprising quality when they
                  have the right lenses and sensors.</p>
              </div>
            </div>

            <div class="item-new slick-slide">
              <div class="image" data-overlay="5">
                <img src="@/assets/img/blog/3.jpg" alt="">
              </div>
              <div class="content">
                <div class="background"></div>
                <h5>Web , Brand</h5>

                <div class="cta">
                  <a href="#">Digital Photography Tips</a>
                </div>

                <p>Simple point-and-shoot digital cameras can give surprising quality when they
                  have the right lenses and sensors.</p>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
    <!-- end latest blog -->
    <Animation />
  </div>
</template>
<style>
.slide-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
}

.slide-title {
  text-align: center;
  margin-top: 10px;
  font-size: 1.5rem;
  color: #333;
}
</style>