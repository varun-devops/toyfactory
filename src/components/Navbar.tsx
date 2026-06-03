'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Search, Menu, X } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

const NAV_ITEMS = [
  ['/', 'Home'],
  ['/products', 'All Toys'],
  ['/products?category=sex', '🔞 Adults'],
  ['/products?category=stem', 'STEM'],
  ['/about', 'About'],
  ['/contact', 'Contact'],
];

const CATS = [
  ['🚗 Hot Wheels', '/products?subcategory=Hot+Wheels'],
  ['🐻 Plush', '/products?category=plush'],
  ['👗 Dolls', '/products?category=dolls'],
  ['🤖 STEM', '/products?category=stem'],
  ['🚙 Ride-On Cars', '/products?subcategory=Toy+cars+(Big)'],
  ['🛴 Scooters', '/products?subcategory=Toy+scooters'],
  ['👨‍🍳 Kitchen', '/products?category=kitchen'],
  ['🏠 Dollhouses', '/products?category=houses'],
  ['🎮 Games', '/products?category=collectibles'],
  ['💆 Wellness', '/products?category=wellness'],
  ['🔞 Adults', '/products?category=sex'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [shadow, setShadow] = useState(false);
  const cartCount = useStore(s => s.cartCount());
  const favorites = useStore(s => s.favorites);
  const router = useRouter();

  useEffect(() => {
    const fn = () => setShadow(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) { router.push(`/products?search=${encodeURIComponent(q.trim())}`); setOpen(false); }
  };

  return (
    <nav style={{
      position:'sticky',top:0,zIndex:40,
      background:'rgba(255,255,255,0.97)',
      backdropFilter:'blur(16px)',
      boxShadow: shadow ? '0 4px 30px rgba(0,0,0,0.08)' : 'none',
      transition:'box-shadow 0.3s',
    }}>
      {/* Main bar */}
      <div style={{maxWidth:1280,margin:'0 auto',padding:'0 20px',display:'flex',alignItems:'center',height:64,gap:16}}>

        {/* Logo */}
        <Link href="/" style={{display:'flex',alignItems:'center',gap:10,flexShrink:0,textDecoration:'none'}}>
          <span style={{fontSize:28}}>🧸</span>
          <div>
            <div className="font-baloo gradient-text" style={{fontSize:20,fontWeight:800,lineHeight:1.1}}>ToyFactory</div>
            <div style={{fontSize:9,color:'#999',fontWeight:700,letterSpacing:'0.08em',marginTop:1}}>INDIA&apos;S #1 TOY STORE</div>
          </div>
        </Link>

        {/* Search */}
        <form onSubmit={search} style={{flex:1,maxWidth:500,display:'flex',gap:0}} className="hidden md:flex">
          <div style={{position:'relative',width:'100%'}}>
            <input
              value={q} onChange={e=>setQ(e.target.value)}
              placeholder="Search toys, brands, categories..."
              style={{
                width:'100%',background:'#f5f5f5',border:'none',
                borderRadius:14,padding:'10px 44px 10px 18px',
                fontSize:13,color:'#111',outline:'none',fontFamily:'inherit',
                transition:'box-shadow 0.2s',
              }}
              onFocus={e=>(e.target.style.boxShadow='0 0 0 3px rgba(255,107,0,0.18)')}
              onBlur={e=>(e.target.style.boxShadow='none')}
            />
            <button type="submit" style={{
              position:'absolute',right:6,top:'50%',transform:'translateY(-50%)',
              background:'linear-gradient(120deg,#FF6B00,#FF3D77)',
              border:'none',borderRadius:10,width:32,height:32,
              display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',
            }}>
              <Search size={14} color="#fff" />
            </button>
          </div>
        </form>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.slice(1,4).map(([href,label]) => (
            <Link key={href} href={href} className="nav-link">{label}</Link>
          ))}
        </div>

        {/* Icons */}
        <div style={{display:'flex',alignItems:'center',gap:4,marginLeft:'auto'}}>
          <Link href="/favorites" style={{position:'relative',width:40,height:40,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:12,background:favorites.length?'#fff0f5':'transparent',textDecoration:'none',transition:'background 0.15s'}}>
            <Heart size={20} style={{color:favorites.length?'#FF3D77':'#666',fill:favorites.length?'#FF3D77':'none'}} />
            {favorites.length>0 && (
              <span style={{position:'absolute',top:4,right:4,width:16,height:16,borderRadius:'50%',background:'#FF3D77',color:'#fff',fontSize:9,fontWeight:900,display:'flex',alignItems:'center',justifyContent:'center'}}>{favorites.length}</span>
            )}
          </Link>
          <Link href="/cart" style={{position:'relative',width:40,height:40,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:12,textDecoration:'none',background:cartCount?'#fff3ea':'transparent',transition:'background 0.15s'}}>
            <ShoppingCart size={20} style={{color:cartCount?'#FF6B00':'#666'}} />
            {cartCount>0 && (
              <span style={{position:'absolute',top:4,right:4,minWidth:18,height:18,borderRadius:9,background:'linear-gradient(120deg,#FF6B00,#FF3D77)',color:'#fff',fontSize:9,fontWeight:900,display:'flex',alignItems:'center',justifyContent:'center',padding:'0 4px'}}>{cartCount}</span>
            )}
          </Link>
          <button onClick={()=>setOpen(!open)} style={{width:40,height:40,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:12,background:'transparent',border:'none',cursor:'pointer'}} className="md:hidden">
            {open ? <X size={22} color="#111" /> : <Menu size={22} color="#111" />}
          </button>
        </div>
      </div>

      {/* Category strip */}
      <div className="hidden md:block" style={{borderTop:'1px solid #f0f0f0',overflowX:'auto'}}>
        <div style={{maxWidth:1280,margin:'0 auto',padding:'0 20px',display:'flex',gap:4,height:40,alignItems:'center'}}>
          {CATS.map(([label,href]) => (
            <Link key={href} href={href} style={{
              whiteSpace:'nowrap',fontSize:12,fontWeight:700,color:'#444',
              padding:'5px 14px',borderRadius:20,textDecoration:'none',
              transition:'all 0.15s',flexShrink:0,
            }}
            onMouseEnter={e=>{(e.target as HTMLElement).style.background='#fff3ea';(e.target as HTMLElement).style.color='#FF6B00';}}
            onMouseLeave={e=>{(e.target as HTMLElement).style.background='transparent';(e.target as HTMLElement).style.color='#444';}}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile search */}
      <form onSubmit={search} className="md:hidden" style={{padding:'0 16px 12px'}}>
        <div style={{position:'relative'}}>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search toys..."
            style={{width:'100%',background:'#f5f5f5',border:'none',borderRadius:14,padding:'10px 44px 10px 18px',fontSize:13,outline:'none',fontFamily:'inherit'}} />
          <button type="submit" style={{position:'absolute',right:6,top:'50%',transform:'translateY(-50%)',background:'linear-gradient(120deg,#FF6B00,#FF3D77)',border:'none',borderRadius:10,width:32,height:32,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>
            <Search size={14} color="#fff" />
          </button>
        </div>
      </form>

      {/* Mobile menu */}
      {open && (
        <div style={{background:'#fff',padding:'12px 16px 20px',boxShadow:'0 20px 40px rgba(0,0,0,0.1)'}}>
          {NAV_ITEMS.map(([href,label]) => (
            <Link key={href} href={href} onClick={()=>setOpen(false)} style={{
              display:'block',padding:'12px 16px',borderRadius:14,
              fontSize:15,fontWeight:700,color:'#222',textDecoration:'none',marginBottom:4,
              transition:'background 0.15s',
            }}
            onMouseEnter={e=>(e.currentTarget.style.background='#fff3ea')}
            onMouseLeave={e=>(e.currentTarget.style.background='transparent')}
            >
              {label}
            </Link>
          ))}
          <div style={{borderTop:'1px solid #f0f0f0',marginTop:8,paddingTop:12}}>
            {[['🛒 Cart','/cart'],['❤️ Favourites','/favorites'],['📦 Orders','/orders']].map(([l,h])=>(
              <Link key={h} href={h} onClick={()=>setOpen(false)} style={{display:'block',padding:'10px 16px',borderRadius:14,fontSize:14,fontWeight:700,color:'#444',textDecoration:'none',marginBottom:2}}>
                {l}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
