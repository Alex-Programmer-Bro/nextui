import {forwardRef} from "@nextui-org/system";
import {pickChildren} from "@nextui-org/shared-utils";
import {motion} from "framer-motion";
import {mergeProps} from "@react-aria/utils";

import {variants} from "./navbar-transitions";
import {UseNavbarProps, useNavbar} from "./use-navbar";
import {NavbarProvider} from "./navbar-context";
import NavbarMenu from "./navbar-menu";

export interface NavbarProps extends Omit<UseNavbarProps, "ref" | "hideOnScroll"> {
  children?: React.ReactNode | React.ReactNode[];
}

const Navbar = forwardRef<NavbarProps, "div">((props, ref) => {
  const {children, ...otherProps} = props;

  const context = useNavbar({ref, ...otherProps});

  const Component = context.Component;

  const [childrenWithoutMenu, menu] = pickChildren(children, NavbarMenu);

  const content = (
    <>
      <header {...context.getWrapperProps()}>{childrenWithoutMenu}</header>
      {menu}
    </>
  );

  return (
    <NavbarProvider value={context}>
      {context.shouldHideOnScroll ? (
        <motion.nav
          animate={context.isHidden ? "hidden" : "visible"}
          initial={false}
          variants={variants}
          {...mergeProps(context.getBaseProps(), context.motionProps)}
        >
          {content}
        </motion.nav>
      ) : (
        <Component {...context.getBaseProps()}>{content}</Component>
      )}
    </NavbarProvider>
  );
});

Navbar.displayName = "NextUI.Navbar";

export default Navbar;
