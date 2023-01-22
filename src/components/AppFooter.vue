<template>
  <footer class="footer">
    <div class="footer_row-top">
      <div class="footer_row-top-content">
        <div class="footer_top_item">
          <h4 class="footer_top_item-title">Contact us</h4>
          <div class="footer_top_item-description">
            if you have a question about the Learn English Network, fill<br />
            out our Contact Form, and we will get back to you asap.
          </div>
        </div>
        <div class="footer_top_item">
          <h4 class="footer_top_item-title">FOLLOW US</h4>
          <div class="footer_top_item-contacts">
            <i class="footer_top_item-contact fa-brands fa-facebook-f"></i>
            <i class="footer_top_item-contact fa-brands fa-twitter"></i>
            <i class="footer_top_item-contact fa-brands fa-linkedin"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="footer_row-bottom">
      <div class="footer_row-bottom-content">
        <div class="footer_row-bottom-item">
          © Copyright - All Rights Reserved.
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup></script>

<style scoped>
.footer {
  width: 100%;
}
.footer_row-top {
  background-color: #212529;
}
.footer_row-top-content {
  display: flex;
  margin: 0 auto;
  width: 1200px;
  padding: 5rem 0;
}
.footer_top_item {
  padding: 0px 15px;
}
.footer_top_item-title {
  color: #fff;
  text-transform: uppercase;
  font-family: "Roboto", sans-serif;
  font-size: 19px;
  font-weight: 500;
  margin-bottom: 16px;
}
.footer_top_item-description {
  font-family: "Open Sans", Arial, sans-serif;
  color: #777;
  font-size: 18px;
  line-height: 32px;
}
.footer_top_item-contacts {
  display: flex;
  column-gap: 10px;
}
.footer_top_item-contact {
  background-color: #fff;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  transition: 0.2s ease-in-out;
  cursor: pointer;
}

.footer_top_item-contact:hover {
  color: #fff;
}

.footer_row-bottom {
  background-color: #1c2023;
  padding: 24px 0;
}

.footer_row-bottom-content {
  width: 1200px;
  margin: 0 auto;
}

.footer_row-bottom-item {
  color: #e5e5e5;
  font-size: 15px;
}

@media (max-width: 1700px) {
  .footer_top_item-title {
    font-size: 17px;
  }
  .footer_top_item-description {
    font-size: 15px;
  }
  .footer_top_item-contact {
    width: 35px;
    height: 35px;
  }

  .footer_row-bottom-item {
    font-size: 15px;
  }
}

@media (max-width: 1550px) {
  .footer_top_item-title {
    font-size: 15px;
  }
  .footer_top_item-description {
    font-size: 15px;
  }
  .footer_top_item-contact {
    width: 33px;
    height: 33px;
  }

  .footer_row-bottom-item {
    font-size: 14px;
  }
}

@media (max-width: 1250px) {
  .footer_row-top-content {
    width: 960px;
  }
  .footer_row-bottom-content {
    width: 960px;
  }
}

@media (max-width: 990px) {
  .footer_row-top-content {
    width: 720px;
  }
  .footer_row-bottom-content {
    width: 720px;
  }

  .footer_top_item-title {
    font-size: 14px;
  }
  .footer_top_item-description {
    font-size: 14px;
  }
  .footer_top_item-contact {
    width: 31px;
    height: 31px;
  }

  .footer_row-bottom-item {
    font-size: 13px;
  }
}

@media (max-width: 770px) {
  .footer_row-top-content {
    width: 540px;
    flex-direction: column;
    row-gap: 20px;
  }
  .footer_row-bottom-content {
    width: 540px;
  }
}
</style>
