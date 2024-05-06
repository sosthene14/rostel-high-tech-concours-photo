<script>
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
  } from "flowbite-svelte";

  import Logo from "../assets/logo.png";
  import SocialIcons from "@rodneylab/svelte-social-icons";
</script>

<Navbar>
  <NavBrand href="/">
    <img src={Logo} class="me-3 h-10 sm:h-[50px]" alt="Flowbite Logo" />
    <span
      class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
      >Rostel High-Tech</span
    >
  </NavBrand>
  <NavHamburger />
  <NavUl>
    <NavLi href="https://www.facebook.com/RostelHighTech"
      ><SocialIcons width={35} height={35} network="facebook" /></NavLi
    >
    <NavLi href="https://www.instagram.com/rostelhightech"
      ><SocialIcons width={35} height={35} network="instagram" /></NavLi
    >
    <NavLi href="https://www.youtube.com/watch?v=RD35mQieZqI"
      ><SocialIcons width={35} height={35} network="youtube" /></NavLi
    >
    <NavLi href="https://www.tiktok.com/@rostelhightech.fr"
      ><SocialIcons width={35} height={35} network="tiktok" /></NavLi
    >
  </NavUl>
</Navbar>
