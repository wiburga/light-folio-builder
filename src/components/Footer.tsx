const Footer = () => {
  return (
    <footer className="py-8 px-4 border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center text-muted-foreground">
          <p className="mb-2">
            Diseñado por <span className="text-primary font-semibold">Isaias Burga</span>
          </p>
          <p className="text-sm">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;