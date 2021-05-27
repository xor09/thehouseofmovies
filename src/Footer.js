import React from "react";

export function Footer() {
  return (
    <>
      <footer class="bg-dark text-center text-white">
        {/* <div>
                <div>hello</div>
                <div>hello</div>
            </div> */}

            <div style={{ marginLeft: "-1%", padding: '2% 0% 2% 0%' }}>
                <a href="#" class="fa fa-facebook"></a>
                <a href="https://twitter.com/_S_Bishal" target='_blank' class="fa fa-twitter"></a>
                <a href="#" class="fa fa-google"></a>
                <a href="https://www.linkedin.com/in/suvechha-bishal/" target='_blank' class="fa fa-linkedin"></a>
                <a href="#" class="fa fa-youtube"></a>
                <a href="#" class="fa fa-instagram"></a>
                <a href="#" class="fa fa-whatsapp"></a>
                <a href="#" class="fa fa-github"></a>
            </div>

        {/* <!-- Copyright --> */}
        <div class="text-center p-3" style={{ backgroundColor: "black" }}>
          © 2021 Copyright: <span> </span>
          <a class="text-white" href="">
            TheHouseOfMovies
          </a>
        </div>
        {/* <!-- Copyright --> */}
      </footer>
    </>
  );
}
