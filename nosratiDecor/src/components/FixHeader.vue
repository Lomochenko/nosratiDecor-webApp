<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <!-- Nav Bar -->
    <div class="dsn-nav-bar">
        <div class="site-header">
            <div class="extend-container">
                <div class="inner-header">
                    <div class="main-logo">
                        <RouterLink to="/">
                            <img class="dark-logo" src="../assets/img/logo-dark.png" alt="" />
                            <img class="light-logo" src="../assets/img/logo.png" alt="" />
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
        <div class="header-top header-top-hamburger">
            <div class="header-container">
                <div class="logo main-logo">
                    <router-link to="/">
                        <img class="dark-logo" src="../assets/img/logo-dark.png" alt="" />
                        <img class="light-logo" src="../assets/img/logo.png" alt="" />
                    </router-link>
                </div>

                <div class="menu-icon" data-dsn="parallax" data-dsn-move="5">
                    <div class="icon-m">
                        <i class="menu-icon-close fas fa-times"></i>
                        <span class="menu-icon__line menu-icon__line-left"></span>
                        <span class="menu-icon__line"></span>
                        <span class="menu-icon__line menu-icon__line-right"></span>
                    </div>

                    <div class="text-menu">
                        <div class="text-button">Menu</div>
                        <div class="text-open">Open</div>
                        <div class="text-close">Close</div>
                    </div>
                </div>

                <div class="nav">
                    <div class="inner">
                        <div class="nav__content">
                            <nav class="accent-menu main-navigation">
                                <ul class="primary-menu">
                                    <li>
                                        <RouterLink to="/">خانه</RouterLink>
                                    </li>
                                    <li>
                                        <RouterLink to="/products">محصولات</RouterLink>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                <div class="nav-content">
                    <div class="inner-content">
                        <address class="v-middle">
                            <span>Egypt</span>
                            <span>Damietta,El-Mahalla El-Kubra,</span>
                            <span>01024552406 , 01004392260</span>
                        </address>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End Nav Bar -->
</template>
