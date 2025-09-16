import Annoucement from "@/components/user-components/layout/Annoucement";
import Footer from "@/components/user-components/layout/Footer";
import Navbar from "@/components/user-components/layout/Navbar";
import MyWishList from "@/components/user-components/wishlist/myWishlist";

export default function WishlistPage() {

  return (
    <div className="min-h-screen bg-background">
      {/* Announcement Bar */}
      <Annoucement />

      {/* Header */}
      <Navbar />

      {/* MyWishlist  */}
      <MyWishList />

      {/* Footer */}
      <Footer />
    </div>
  );
}
