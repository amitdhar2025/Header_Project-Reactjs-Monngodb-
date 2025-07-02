import NavigationMenu from "../model/navigationMenu.model.js";

// Get the navigation menu, create default if not exists
export const getMenu = async (req, res) => {
  try {
    let menuDoc = await NavigationMenu.findOne();
    if (!menuDoc) {
      // Create default menu
      menuDoc = new NavigationMenu({
        menuItems: [
          { title: "Home", link: "/" },
          {
            title: "Course",
            subMenu: [
              { title: "Java", link: "/course/java" },
              { title: "Python", link: "/course/python" },
              { title: "Dot Net", link: "/course/dotnet" },
              { title: "React", link: "/course/react" },
            ],
          },
          { title: "Contact", link: "/contact" },
          { title: "About", link: "/about" },
          { title: "Cart", link: "/cart" },
        ],
      });
      await menuDoc.save();
    }
    res.json(menuDoc.menuItems);
  } catch (error) {
    res.status(500).json({ message: "Failed to get menu", error: error.message });
  }
};

// Update the navigation menu
export const updateMenu = async (req, res) => {
  try {
    const newMenuItems = req.body;
    let menuDoc = await NavigationMenu.findOne();
    if (!menuDoc) {
      menuDoc = new NavigationMenu({ menuItems: newMenuItems });
    } else {
      menuDoc.menuItems = newMenuItems;
    }
    await menuDoc.save();
    res.json(menuDoc.menuItems);
  } catch (error) {
    res.status(500).json({ message: "Failed to update menu", error: error.message });
  }
};
