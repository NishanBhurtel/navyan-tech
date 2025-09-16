export default function NavyanMap() {
  return (
    <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-background pb-12 sm:pb-16">
      <div className="mx-auto px-4 text-center max-w-[1200px]">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
          Find Us At
        </h1>

        {/* Responsive map wrapper */}
        <div className="relative w-full overflow-hidden rounded-xl shadow-lg aspect-video max-h-[600px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2967.154484113904!2d83.46266567456605!3d27.68689112639497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399686879173ff97%3A0x86ccc97bea5f7b9b!2sNavyan%20Tech%20Store%20-%20Butwal!5e1!3m2!1sen!2snp!4v1757672012319!5m2!1sen!2snp"
            loading="lazy"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </div>
    </section>
  );
}
