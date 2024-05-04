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
    <img src={Logo} class="me-3 h-20 sm:h-[70px]" alt="Flowbite Logo" />
    <span
      class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
      >Rostel High-Tech</span
    >
  </NavBrand>
  <NavHamburger />
  <NavUl>
    <NavLi href="/"><SocialIcons network="facebook"  /></NavLi>
    <NavLi href="/about"><SocialIcons network="instagram"  /></NavLi>
    <NavLi href="/docs/components/navbar"><SocialIcons network="youtube"  /></NavLi>
    <NavLi href="/pricing"><SocialIcons network="tiktok"  /></NavLi>
  </NavUl>
</Navbar>
