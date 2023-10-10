import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/container";
import Nav from "react-bootstrap/Nav";
import { useGetUserID } from "../../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import { useGetUserRole } from "../../hooks/useGetUserRole";

const NavBar = () => {
  const [_, setCookies] = useCookies(["access_token"]);

  const userID = useGetUserID();

  const userRole = useGetUserRole();

  const signOut = () => {
    window.localStorage.clear();
    setCookies("access_token");
  };
  return (
    <Navbar sticky="top" expand="lg" className="bg-primary">
      <Container>
        <Navbar.Brand className="text-light" href="/" aria-label="home-page">
          Shopify
        </Navbar.Brand>
        <Navbar.Toggle className="bg-light" />
        <Navbar.Collapse>
          <Nav className="w-100 d-flex justify-content-end">
            <Nav.Link
              className="text-light d-flex align-items-center gap-1"
              href="/"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="15px"
                height="15px"
                fill="#FFFFFF"
              >
                <path d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 11 21 L 11 15 L 13 15 L 13 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z M 12 4.7910156 L 18 10.191406 L 18 11 L 18 19 L 15 19 L 15 13 L 9 13 L 9 19 L 6 19 L 6 10.191406 L 12 4.7910156 z" />
              </svg>
              Home
            </Nav.Link>
            <Nav.Link
              className="text-light d-flex align-items-center gap-1"
              href="/cart"
            >
              <svg
                fill="#FFFFFF"
                version="1.1"
                id="Capa_1"
                width="15px"
                height="15px"
                viewBox="0 0 902.86 902.86"
              >
                <g>
                  <g>
                    <path
                      d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z
			 M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z"
                    />
                    <path
                      d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717
			c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744
			c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742
			C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744
			c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z
			 M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742
			S619.162,694.432,619.162,716.897z"
                    />
                  </g>
                </g>
              </svg>
              Cart
            </Nav.Link>

            {!userID && (
              <>
                {" "}
                <Nav.Link
                  className="text-light d-flex align-items-center gap-1"
                  href="/signin"
                >
                  <svg
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#FFFFFF"
                    width="15px"
                    height="15px"
                  >
                    <path d="M426.666667 736V597.333333H128v-170.666666h298.666667V288L650.666667 512 426.666667 736M341.333333 85.333333h384a85.333333 85.333333 0 0 1 85.333334 85.333334v682.666666a85.333333 85.333333 0 0 1-85.333334 85.333334H341.333333a85.333333 85.333333 0 0 1-85.333333-85.333334v-170.666666h85.333333v170.666666h384V170.666667H341.333333v170.666666H256V170.666667a85.333333 85.333333 0 0 1 85.333333-85.333334z" />
                  </svg>
                  Sign in
                </Nav.Link>
                <Nav.Link
                  className="text-light d-flex align-items-center gap-1"
                  href="/signup"
                >
                  <svg
                    fill="#FFFFFF"
                    width="15px"
                    height="15px"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M632.555 583.662a334.724 334.724 0 0 1 34.43 15.764c13.844 7.312 19.14 24.463 11.828 38.308-7.312 13.845-24.463 19.14-38.308 11.829-39.825-21.033-84.256-32.18-130.354-32.18-134.46 0-249.156 95.628-274.315 225.944-2.968 15.373-17.837 25.43-33.21 22.462-15.374-2.968-25.43-17.837-22.462-33.21 22.237-115.181 102.51-207.796 207.629-248.892-76.518-42.868-128.233-124.698-128.233-218.602 0-138.316 112.198-250.435 250.592-250.435 138.392 0 250.59 112.12 250.59 250.435 0 93.886-51.695 175.702-128.187 218.577z m71.487-218.577c0-106.992-86.804-193.735-193.89-193.735-107.088 0-193.892 86.742-193.892 193.735 0 106.992 86.804 193.734 193.892 193.734 107.086 0 193.89-86.743 193.89-193.734z m12.694 346.77V626.83a28.26 28.26 0 0 1 3.87-14.324 28.468 28.468 0 0 1 10.175-10.174 28.26 28.26 0 0 1 14.324-3.87 28.26 28.26 0 0 1 14.324 3.87 28.468 28.468 0 0 1 10.174 10.174 28.26 28.26 0 0 1 3.87 14.324v85.025h84.179c15.656 0 28.348 12.692 28.348 28.349 0 15.656-12.692 28.348-28.348 28.348h-84.18v84.08a28.26 28.26 0 0 1-3.87 14.324 28.468 28.468 0 0 1-10.173 10.174 28.26 28.26 0 0 1-14.324 3.87 28.26 28.26 0 0 1-14.324-3.87 28.468 28.468 0 0 1-10.175-10.174 28.26 28.26 0 0 1-3.87-14.324v-84.08h-85.124c-15.656 0-28.348-12.692-28.348-28.348 0-15.657 12.692-28.349 28.348-28.349h85.124z" />
                  </svg>
                  Register
                </Nav.Link>
              </>
            )}
            {userRole === "admin" && (
              <>
                <Nav.Link
                  className="text-light d-flex align-items-center gap-1"
                  href="/dashboard"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    id="dashboard"
                    width="15px"
                    height="15px"
                  >
                    <rect
                      width="151"
                      height="151"
                      x="73"
                      y="73"
                      fill="#FFFFFF"
                      stroke="#000"
                      rx="33.03"
                      ry="33.03"
                    ></rect>
                    <rect
                      width="151"
                      height="151"
                      x="288"
                      y="73"
                      fill="#FFFFFF"
                      stroke="#000"
                      rx="33.03"
                      ry="33.03"
                    ></rect>
                    <rect
                      width="151"
                      height="151"
                      x="73"
                      y="288"
                      fill="#FFFFFF"
                      stroke="#000"
                      rx="33.03"
                      ry="33.03"
                    ></rect>
                    <rect
                      width="151"
                      height="151"
                      x="288"
                      y="288"
                      fill="#FFFFFF"
                      stroke="#000"
                      rx="33.03"
                      ry="33.03"
                    ></rect>
                  </svg>
                  Dashboard
                </Nav.Link>
                <Nav.Link
                  className="text-light d-flex align-items-center gap-1"
                  href="/createProduct"
                >
                  <svg
                    fill="#FFFFFF"
                    height="15px"
                    id="Layer_1"
                    version="1.1"
                    viewBox="0 0 512 512"
                    width="15px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M256,512C114.625,512,0,397.391,0,256C0,114.609,114.625,0,256,0c141.391,0,256,114.609,256,256  C512,397.391,397.391,512,256,512z M256,64C149.969,64,64,149.969,64,256s85.969,192,192,192c106.047,0,192-85.969,192-192  S362.047,64,256,64z M288,384h-64v-96h-96v-64h96v-96h64v96h96v64h-96V384z" />
                  </svg>
                  Create Product
                </Nav.Link>{" "}
              </>
            )}
            {userID && (
              <Nav.Link
                onClick={signOut}
                className="text-light d-flex align-items-center gap-1"
                href="/"
              >
                <svg
                  fill="#FFFFFF"
                  height="15px"
                  width="15px"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384.971 384.971"
                >
                  <g>
                    <g id="Sign_Out">
                      <path
                        d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03
			C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03
			C192.485,366.299,187.095,360.91,180.455,360.91z"
                      />
                      <path
                        d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279
			c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179
			c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z"
                      />
                    </g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                  </g>
                </svg>
                Log out
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
