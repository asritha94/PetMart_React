from pathlib import Path
import json

root = Path(__file__).resolve().parents[1]
images_dir = root / 'public' / 'images'
for subdir in [
    'pets/dogs', 'pets/cats', 'pets/birds', 'pets/small-pets', 'pets/fish',
    'food/dog-food', 'food/cat-food', 'food/bird-food', 'food/fish-food', 'food/small-pet-food',
    'products/accessories', 'products/grooming', 'products/toys', 'products/healthcare', 'products/aquarium', 'products/furniture',
    'banners'
]:
    (images_dir / subdir).mkdir(parents=True, exist_ok=True)

# Generic inline SVG template preserving clean product/category identity

def make_svg(title, subtitle, accent, bg):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 900">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="{bg}"/>
      <stop offset="100%" stop-color="#eef2ff"/>
    </linearGradient>
  </defs>
  <rect width="900" height="900" fill="url(#bg)"/>
  <rect x="60" y="60" width="780" height="780" rx="48" fill="rgba(255,255,255,0.75)"/>
  <circle cx="450" cy="270" r="160" fill="{accent}" opacity="0.15"/>
  <circle cx="650" cy="610" r="120" fill="{accent}" opacity="0.10"/>
  <circle cx="250" cy="610" r="110" fill="{accent}" opacity="0.08"/>
  <text x="450" y="390" text-anchor="middle" font-size="64" font-weight="700" fill="#0f172a" font-family="Arial, sans-serif">{title}</text>
  <text x="450" y="470" text-anchor="middle" font-size="28" fill="#475569" font-family="Arial, sans-serif">{subtitle}</text>
  <text x="450" y="610" text-anchor="middle" font-size="24" fill="#1f2937" font-family="Arial, sans-serif">PetMart</text>
</svg>
'''

pet_products = {
    'pets/dogs': ['golden-retriever','labrador','german-shepherd','pomeranian','beagle','pug','husky','shih-tzu','dachshund','rottweiler','french-bulldog','cocker-spaniel'],
    'pets/cats': ['persian','siamese','british-shorthair','maine-coon','bengal','ragdoll','scottish-fold','american-shorthair'],
    'pets/birds': ['parrot','cockatiel','lovebird','budgerigar','canary','finch'],
    'pets/small-pets': ['rabbit','hamster','guinea-pig','turtle'],
    'pets/fish': ['goldfish','betta','guppy','angelfish','molly'],
    'food/dog-food': ['puppy-food','adult-dog-food','senior-dog-food','grain-free-dog-food','chicken-dog-food','beef-dog-food','dry-dog-food','wet-dog-food','dog-treats','dental-chews'],
    'food/cat-food': ['kitten-food','adult-cat-food','senior-cat-food','tuna-cat-food','chicken-cat-food','dry-cat-food','wet-cat-food','cat-treats'],
    'food/bird-food': ['parrot-seed-mix','budgie-food','cockatiel-food','lovebird-food','bird-seed-mix'],
    'food/fish-food': ['goldfish-flakes','betta-pellets','tropical-fish-food','fish-flakes','fish-pellets'],
    'food/small-pet-food': ['rabbit-pellets','hamster-food','guinea-pig-food'],
    'products/accessories': ['dog-collar','cat-collar','dog-leash','cat-harness','food-bowl','water-bowl','feeding-mat','pet-bed','travel-bag','pet-carrier','pet-clothing','pet-shoes','id-tag','portable-water-bottle'],
    'products/grooming': ['grooming-kit','pet-shampoo','pet-conditioner','slicker-brush','deshedding-brush','flea-comb','nail-clipper','nail-grinder','pet-hair-dryer','pet-toothbrush','pet-toothpaste','dental-cleaning-kit','ear-cleaner','paw-cleaner'],
    'products/toys': ['tennis-ball','rope-toy','chew-toy','frisbee','squeaky-toy','puzzle-toy','feather-wand','cat-ball','laser-toy','cat-tunnel','scratching-toy','cat-toy-tree','bird-swing','bell-toy','hanging-toy','bird-ladder','bird-chew-toy'],
    'products/healthcare': ['pet-vitamins','supplements','joint-support','dental-care','flea-tick-product','first-aid-kit','ear-care','paw-care','skin-care','hygiene-product'],
    'products/aquarium': ['aquarium-tank','fish-bowl','aquarium-filter','air-pump','aquarium-light','aquarium-heater','water-conditioner','aquarium-gravel','artificial-aquarium-plants','fish-net','aquarium-cleaning-kit'],
    'products/furniture': ['dog-house','dog-crate','dog-playpen','cat-tree','cat-condo','scratching-tower','pet-sofa','pet-fence','pet-bed-furniture']
}

color_map = {
    'pets/dogs': '#2563eb',
    'pets/cats': '#f97316',
    'pets/birds': '#10b981',
    'pets/small-pets': '#8b5cf6',
    'pets/fish': '#06b6d4',
    'food/dog-food': '#f59e0b',
    'food/cat-food': '#fb7185',
    'food/bird-food': '#a78bfa',
    'food/fish-food': '#38bdf8',
    'food/small-pet-food': '#84cc16',
    'products/accessories': '#7c3aed',
    'products/grooming': '#14b8a6',
    'products/toys': '#f97316',
    'products/healthcare': '#10b981',
    'products/aquarium': '#0ea5e9',
    'products/furniture': '#f59e0b',
}

product_paths = []
for folder, names in pet_products.items():
    for name in names:
        path = images_dir / folder / f'{name}.svg'
        title = name.replace('-', ' ').replace('_', ' ').title()
        subtitle = folder.replace('/', ' / ').replace('products ', '').replace('pets ', '').replace('food ', '')
        path.write_text(make_svg(title, subtitle, color_map.get(folder, '#2563eb'), '#f8fafc'), encoding='utf-8')
        product_paths.append(f'/images/{folder}/{name}.svg')

(images_dir / 'placeholder.svg').write_text(make_svg('PetMart', 'Image unavailable', '#64748b', '#f1f5f9'), encoding='utf-8')

category_map = [
    ('Pets', 'pets', '/images/pets/dogs/golden-retriever.svg', 'Adoptable pets and companions'),
    ('Pet Food', 'pet-food', '/images/food/dog-food/puppy-food.svg', 'Nutritious meals and treats for every pet'),
    ('Pet Accessories', 'pet-accessories', '/images/products/accessories/dog-collar.svg', 'Comfort and everyday essentials'),
    ('Grooming', 'grooming', '/images/products/grooming/grooming-kit.svg', 'Clean, healthy, and well-kept coats'),
    ('Toys', 'toys', '/images/products/toys/tennis-ball.svg', 'Play, enrichment, and mental stimulation'),
    ('Healthcare', 'healthcare', '/images/products/healthcare/pet-vitamins.svg', 'Wellness kits and preventive care'),
    ('Aquarium', 'aquarium', '/images/products/aquarium/aquarium-tank.svg', 'Aquatic equipment and maintenance'),
    ('Pet Furniture', 'pet-furniture', '/images/products/furniture/cat-tree.svg', 'Cozy and functional pet spaces'),
]

pets = [
    ('Golden Retriever','Dogs','Dog','PetMart',25000,32000,22,4.8,120,5),
    ('Labrador','Dogs','Dog','PetMart',22000,29000,24,4.7,110,6),
    ('German Shepherd','Dogs','Dog','UrbanPaws',26000,33500,22,4.9,130,7),
    ('Pomeranian','Dogs','Dog','PawJoy',14000,18000,22,4.6,90,8),
    ('Beagle','Dogs','Dog','HappyPaws',16000,21000,24,4.7,95,9),
    ('Pug','Dogs','Dog','PawNest',15000,19500,23,4.5,80,7),
    ('Husky','Dogs','Dog','Snowberry',28000,36000,22,4.8,105,5),
    ('Shih Tzu','Dogs','Dog','FluffyCare',12000,16500,27,4.6,70,10),
    ('Dachshund','Dogs','Dog','PawBloom',14500,19000,24,4.7,68,9),
    ('Rottweiler','Dogs','Dog','AlphaPet',31000,40000,22,4.9,140,4),
    ('French Bulldog','Dogs','Dog','PetCharm',18000,24000,25,4.6,92,6),
    ('Cocker Spaniel','Dogs','Dog','CanineLane',17000,22000,23,4.7,88,7),
    ('Persian','Cats','Cat','WhiskerWorld',18000,24000,25,4.8,108,8),
    ('Siamese','Cats','Cat','KittyNest',20000,26000,23,4.9,115,7),
    ('British Shorthair','Cats','Cat','CatVilla',21000,28000,25,4.7,96,6),
    ('Maine Coon','Cats','Cat','FurLuxe',25000,33000,24,4.9,122,5),
    ('Bengal','Cats','Cat','WildWhisk',23000,30000,23,4.8,110,6),
    ('Ragdoll','Cats','Cat','VelvetPaws',22000,29000,24,4.8,109,7),
    ('Scottish Fold','Cats','Cat','FoldNest',20000,26000,23,4.7,90,8),
    ('American Shorthair','Cats','Cat','MewHouse',17000,22000,22,4.6,84,9),
    ('Parrot','Birds','Bird','AvianJoy',9500,13000,27,4.7,76,10),
    ('Cockatiel','Birds','Bird','FeatherFriend',6500,9000,28,4.6,70,12),
    ('Lovebird','Birds','Bird','PetSong',5400,7800,31,4.5,64,15),
    ('Budgerigar','Birds','Bird','SkyNest',4800,6900,30,4.6,62,16),
    ('Canary','Birds','Bird','SingingSprout',4300,6100,29,4.4,53,18),
    ('Finch','Birds','Bird','TinyJewel',3900,5500,29,4.3,48,20),
    ('Rabbit','Small Pets','Small Pets','HoppyHome',5500,7600,27,4.7,66,14),
    ('Hamster','Small Pets','Small Pets','TinyOrbit',3000,4200,29,4.4,41,18),
    ('Guinea Pig','Small Pets','Small Pets','MiniComet',4200,5800,27,4.5,49,17),
    ('Turtle','Small Pets','Small Pets','ShellCare',6200,8600,28,4.6,58,13),
    ('Goldfish','Fish','Fish','BlueWave',2200,3400,35,4.5,42,22),
    ('Betta','Fish','Fish','AquaEden',2800,3900,28,4.6,50,20),
    ('Guppy','Fish','Fish','RiverBloom',1800,2700,33,4.4,40,24),
    ('Angelfish','Fish','Fish','AquaVista',2600,3600,31,4.6,44,21),
    ('Molly','Fish','Fish','CoralSprig',2100,3100,33,4.5,39,23),
]

# Build product entries for 8 categories with 12-15 items each
categories = {
    'Pets': [
        ('Golden Retriever','Dogs','Dog','PetMart',25000,32000,22,4.8,120,5),
        ('Labrador','Dogs','Dog','PetMart',22000,29000,24,4.7,110,6),
        ('German Shepherd','Dogs','Dog','UrbanPaws',26000,33500,22,4.9,130,7),
        ('Pomeranian','Dogs','Dog','PawJoy',14000,18000,22,4.6,90,8),
        ('Beagle','Dogs','Dog','HappyPaws',16000,21000,24,4.7,95,9),
        ('Pug','Dogs','Dog','PawNest',15000,19500,23,4.5,80,7),
        ('Persian','Cats','Cat','WhiskerWorld',18000,24000,25,4.8,108,8),
        ('Siamese','Cats','Cat','KittyNest',20000,26000,23,4.9,115,7),
        ('Parrot','Birds','Bird','AvianJoy',9500,13000,27,4.7,76,10),
        ('Cockatiel','Birds','Bird','FeatherFriend',6500,9000,28,4.6,70,12),
        ('Rabbit','Small Pets','Small Pets','HoppyHome',5500,7600,27,4.7,66,14),
        ('Goldfish','Fish','Fish','BlueWave',2200,3400,35,4.5,42,22),
        ('Betta','Fish','Fish','AquaEden',2800,3900,28,4.6,50,20),
    ],
    'Pet Food': [
        ('Premium Puppy Food','Dog Food','Royal Canin',1499,1899,22,4.8,540,24),
        ('Adult Dog Food','Dog Food','Pedigree',1399,1750,20,4.6,470,26),
        ('Senior Dog Food','Dog Food','Drools',1599,1999,20,4.7,410,19),
        ('Grain-Free Dog Food','Dog Food','Nature’s Best',1799,2299,22,4.8,390,16),
        ('Chicken Dog Food','Dog Food','BarkBuddy',1299,1699,24,4.7,355,27),
        ('Beef Dog Food','Dog Food','PawPrime',1499,1900,21,4.6,340,20),
        ('Kitten Food','Cat Food','Whiskas',999,1299,23,4.6,305,28),
        ('Adult Cat Food','Cat Food','Me-O',1099,1399,21,4.7,344,27),
        ('Senior Cat Food','Cat Food','CatWell',1199,1499,20,4.6,290,25),
        ('Parrot Seed Mix','Bird Food','FeatherChoice',649,799,19,4.5,180,33),
        ('Budgie Food','Bird Food','AviFresh',599,749,20,4.4,160,35),
        ('Goldfish Flakes','Fish Food','AquaNourish',499,699,29,4.5,143,40),
        ('Betta Pellets','Fish Food','AquaPrime',549,749,28,4.6,150,35),
        ('Rabbit Pellets','Small Pet Food','BunnyBite',699,899,22,4.6,138,34),
        ('Hamster Food','Small Pet Food','TinyNibble',599,799,20,4.5,125,36),
    ],
    'Pet Accessories': [
        ('Leather Dog Collar','Collars','PawLux',899,1199,25,4.7,230,24),
        ('Cat Breakaway Collar','Collars','WhiskerFix',699,899,22,4.6,205,26),
        ('Retractable Dog Leash','Leashes','WalkWise',1299,1699,24,4.8,260,20),
        ('Pet Harness','Harnesses','TrailPaws',1499,1999,25,4.7,214,18),
        ('Stainless Food Bowl','Food Bowls','BowlMate',599,799,25,4.6,200,31),
        ('Double Water Bowl','Water Bowls','HydraPet',749,999,25,4.7,198,28),
        ('Feeding Mat','Feeding Mats','PetNest',499,699,29,4.5,170,36),
        ('Orthopedic Pet Bed','Pet Beds','CozyPaws',2499,3299,24,4.8,320,14),
        ('Travel Carrier','Travel Bags','GoPet',2999,3999,25,4.7,240,12),
        ('Pet Carrier','Pet Carriers','CarryNest',3499,4499,22,4.8,245,11),
        ('Winter Pet Clothing','Pet Clothing','PawWear',1299,1699,23,4.5,176,20),
        ('Anti-Slip Pet Shoes','Pet Shoes','PawGrip',1099,1499,27,4.6,182,22),
        ('Custom ID Tag','ID Tags','TagTrail',399,599,33,4.5,140,42),
        ('Portable Water Bottle','Water Bottles','SipPaw',699,899,22,4.7,178,29),
    ],
    'Grooming': [
        ('Professional Grooming Kit','Grooming Kits','PetCare Pro',1899,2499,24,4.8,270,18),
        ('Pet Shampoo','Shampoos','FurGlow',699,899,22,4.6,220,26),
        ('Pet Conditioner','Conditioners','SilkPaw',749,999,25,4.7,210,24),
        ('Slicker Brush','Brushes','BrushBark',649,799,19,4.6,180,30),
        ('Deshedding Brush','Brushes','FurEase',899,1199,25,4.8,190,25),
        ('Flea Comb','Brushes','BugShield',459,599,23,4.5,145,40),
        ('Nail Clipper','Nail Care','ClawCut',499,699,29,4.6,140,38),
        ('Nail Grinder','Nail Care','SmoothPaw',1399,1799,22,4.7,160,24),
        ('Pet Hair Dryer','Dryers','DryFur',3199,4199,24,4.8,198,12),
        ('Pet Toothbrush','Dental Care','SmileClaw',349,499,30,4.5,150,39),
        ('Pet Toothpaste','Dental Care','FreshChew',399,559,29,4.6,146,37),
        ('Dental Cleaning Kit','Dental Care','SmilePaws',1199,1499,20,4.7,176,23),
        ('Ear Cleaner','Care Products','CleanEars',599,799,25,4.5,160,31),
        ('Paw Cleaner','Care Products','SoftPaw',699,899,22,4.6,152,29),
    ],
    'Toys': [
        ('Tennis Ball','Dog Toys','PlayFetch',299,399,25,4.7,230,45),
        ('Rope Toy','Dog Toys','BiteLine',399,549,27,4.6,180,39),
        ('Chew Toy','Dog Toys','ChewFun',499,699,29,4.8,214,34),
        ('Frisbee','Dog Toys','SkyLeap',549,749,27,4.7,172,33),
        ('Squeaky Toy','Dog Toys','BarkBuzz',349,499,30,4.6,190,40),
        ('Puzzle Toy','Dog Toys','ThinkPaw',999,1299,23,4.8,166,27),
        ('Feather Wand','Cat Toys','WhiskerPlay',499,699,29,4.7,184,36),
        ('Cat Ball','Cat Toys','PurrRoll',299,399,25,4.5,158,44),
        ('Laser Toy','Cat Toys','GlowPaws',599,799,25,4.6,177,32),
        ('Cat Tunnel','Cat Toys','TunnelPurr',1599,2199,27,4.8,163,19),
        ('Bird Swing','Bird Toys','FeatherArc',629,799,21,4.5,126,29),
        ('Bell Toy','Bird Toys','ChimeNest',399,599,33,4.4,112,38),
        ('Hanging Toy','Bird Toys','NestJoy',459,659,28,4.5,118,31),
        ('Bird Ladder','Bird Toys','PerchPlus',799,1099,22,4.6,124,27),
    ],
    'Healthcare': [
        ('Pet Vitamins','Supplements','VetBoost',899,1199,25,4.7,220,26),
        ('Joint Support','Supplements','FlexPaw',1299,1699,23,4.8,210,22),
        ('Dental Care','Dental Care','FreshBite',699,899,22,4.6,185,31),
        ('Flea & Tick Care','Parasite Care','DefendPet',999,1299,23,4.7,192,28),
        ('First Aid Kit','Emergency Care','MediPet',1499,1999,25,4.8,204,18),
        ('Ear Care','Ear Care','PetClean',599,799,25,4.5,165,32),
        ('Paw Care','Paw Care','SoftStep',749,999,25,4.6,171,29),
        ('Skin Care','Skin Care','PetCalm',899,1199,24,4.7,178,27),
        ('Hygiene Product','Hygiene Care','FreshFur',649,849,22,4.5,154,34),
        ('Pet Supplements','Supplements','PurePaw',849,1099,20,4.6,166,30),
    ],
    'Aquarium': [
        ('Aquarium Tank','Tanks','AquaNest',4199,5199,19,4.8,140,9),
        ('Fish Bowl','Bowls','WaterGlow',799,1099,27,4.5,104,18),
        ('Aquarium Filter','Filtration','PureFlow',1499,1999,25,4.7,120,14),
        ('Air Pump','Pumps','BubbleWave',899,1199,25,4.6,118,16),
        ('Aquarium Light','Lighting','GlowWave',1199,1599,25,4.7,110,15),
        ('Aquarium Heater','Heating','WarmAqua',1599,2099,24,4.6,101,12),
        ('Water Conditioner','Care','ClearAqua',699,899,22,4.6,108,18),
        ('Aquarium Gravel','Decor','PebblePure',599,799,20,4.5,92,21),
        ('Artificial Aquarium Plants','Decor','GreenAqua',799,999,20,4.5,93,19),
        ('Fish Net','Tools','SafeCatch',349,499,30,4.5,87,24),
        ('Aquarium Cleaning Kit','Tools','CleanAqua',1099,1499,22,4.7,96,16),
    ],
    'Pet Furniture': [
        ('Dog House','Dog Houses','BarkHaven',5499,6699,17,4.8,86,7),
        ('Dog Crate','Dog Crates','SecureNest',5999,7499,20,4.7,82,6),
        ('Dog Playpen','Playpens','ActivePaws',3299,4499,27,4.6,78,10),
        ('Cat Tree','Cat Trees','ClimbNest',3999,5299,25,4.8,92,8),
        ('Cat Condo','Cat Condos','CatCove',3899,4999,22,4.7,82,9),
        ('Scratching Tower','Scratching Towers','FelineClimb',2999,3799,21,4.5,70,11),
        ('Pet Sofa','Sofas','SoftRest',3399,4299,22,4.7,76,12),
        ('Pet Fence','Fences','PawBound',2599,3399,23,4.6,68,13),
        ('Pet Bed Furniture','Pet Beds','RestZone',2499,3299,24,4.7,74,14),
    ],
}

product_entries = []
idx = 1
for category_name, items in categories.items():
    for name, subcategory, brand, price, original_price, discount, rating, reviews, stock in items:
        slug = category_name.lower().replace(' ', '-')
        if category_name == 'Pet Accessories':
            primary = 'pet-accessories'
        elif category_name == 'Pet Food':
            primary = 'pet-food'
        elif category_name == 'Pet Furniture':
            primary = 'pet-furniture'
        else:
            primary = slug
        image_name = name.lower().replace('&', '').replace(' ', '-').replace("'", '').replace('.', '')
        if category_name == 'Pets':
            folder = 'pets/' + ('dogs' if subcategory in ['Dogs'] else 'cats' if subcategory in ['Cats'] else 'birds' if subcategory in ['Birds'] else 'small-pets' if subcategory in ['Small Pets'] else 'fish')
        elif category_name == 'Pet Food':
            folder = 'food/' + ('dog-food' if subcategory in ['Dog Food'] else 'cat-food' if subcategory in ['Cat Food'] else 'bird-food' if subcategory in ['Bird Food'] else 'fish-food' if subcategory in ['Fish Food'] else 'small-pet-food')
        elif category_name == 'Pet Accessories':
            folder = 'products/accessories'
        elif category_name == 'Grooming':
            folder = 'products/grooming'
        elif category_name == 'Toys':
            folder = 'products/toys'
        elif category_name == 'Healthcare':
            folder = 'products/healthcare'
        elif category_name == 'Aquarium':
            folder = 'products/aquarium'
        else:
            folder = 'products/furniture'
        image = f'/images/{folder}/{image_name}.svg'
        item = {
            'id': idx,
            'name': name,
            'category': category_name,
            'subcategory': subcategory,
            'brand': brand,
            'primaryCategory': primary,
            'image': image,
            'additionalImages': [image, image],
            'description': f'{name} is a premium {category_name.lower()} item built for comfort, health, and everyday routine care.',
            'price': price,
            'originalPrice': original_price,
            'oldPrice': original_price,
            'discount': discount,
            'rating': rating,
            'reviews': reviews,
            'stock': stock,
            'gallery': [image, image],
            'isFeatured': True,
        }
        product_entries.append(item)
        idx += 1

# Defensive: ensure at least 100 products
assert len(product_entries) >= 100, f'Only {len(product_entries)} products were created.'

# Write final file as JS module
lines = []
lines.extend([
    '// =====================================================',
    '// PRODUCT IMAGE PATHS',
    '// Change the image path here whenever you want',
    '// to replace a product photo.',
    '// =====================================================',
    '',
    'export const categoryImageFolders = {',
    '  "Pets": "/images/pets/",',
    '  "Pet Food": "/images/food/",',
    '  "Pet Accessories": "/images/products/accessories/",',
    '  "Grooming": "/images/products/grooming/",',
    '  "Toys": "/images/products/toys/",',
    '  "Healthcare": "/images/products/healthcare/",',
    '  "Aquarium": "/images/products/aquarium/",',
    '  "Pet Furniture": "/images/products/furniture/"',
    '};',
    '',
    'export const validateCategoryImage = (category, imagePath = "") => {',
    '  const folder = categoryImageFolders[category];',
    '  if (!folder || !imagePath) return false;',
    '  return imagePath.startsWith(folder) || imagePath.startsWith("https://");',
    '};',
    '',
    'export const categories = [',
])
for name, slug, img, description in category_map:
    lines.extend([
        '  {',
        f'    id: "{slug}",',
        f'    name: "{name}",',
        f'    slug: "{slug}",',
        f'    icon: "{( "🐾" if name == "Pets" else "🥣" if name == "Pet Food" else "🦴" if name == "Pet Accessories" else "🧴" if name == "Grooming" else "🎾" if name == "Toys" else "💊" if name == "Healthcare" else "🐠" if name == "Aquarium" else "🛏️") }",',
        f'    image: "{img}",',
        f'    description: "{description}",',
        '    count: 0',
        '  },',
    ])
lines.extend(['];', '', 'export const products = ['])
for item in product_entries:
    lines.append('  {')
    for key in ['id','name','category','subcategory','brand','primaryCategory','image','additionalImages','description','price','originalPrice','oldPrice','discount','rating','reviews','stock','gallery']:
        value = item[key]
        if isinstance(value, str):
            escaped = value.replace('\\', '\\\\').replace('"', '\\"')
            if key in ['description']:
                lines.append(f'    {key}: "{escaped}",')
            else:
                lines.append(f'    {key}: "{escaped}",')
        elif isinstance(value, list):
            inner = ', '.join(f'"{str(v).replace("\\", "\\\\").replace("\"", "\\\"")}"' for v in value)
            lines.append(f'    {key}: [{inner}],')
        elif isinstance(value, bool):
            lines.append(f'    {key}: {str(value).lower()},')
        else:
            lines.append(f'    {key}: {value},')
    lines.append('  },')
lines.extend(['];', ''])
(root / 'src' / 'data' / 'products.js').write_text('\n'.join(lines), encoding='utf-8')

# ensure route values are valid for app filters
print(f'Created {len(product_entries)} catalog entries and {len(product_paths)} SVG assets.')
