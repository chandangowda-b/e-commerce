import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import swiftImg from '../assets/cars/swift.jpeg';
import tiagoImg from '../assets/cars/tiago.jpeg';
import i20Img from '../assets/cars/i20.jpeg';
import vernaImg from '../assets/cars/verna.jpeg';
import virtusImg from '../assets/cars/virtnus.jpeg';
import cityImg from '../assets/cars/city.jpeg';
import xuv700Img from '../assets/cars/xuv700.jpeg';
import cretaImg from '../assets/cars/creta.jpeg';
import nexonImg from '../assets/cars/nexon.jpeg';
import punchImg from '../assets/cars/punch.jpeg';
import dzireImg from '../assets/cars/Dzira.jpeg';
import balenoImg from '../assets/cars/baleno.jpeg';

const CATEGORIES = [
  {
    type: 'Hatchback',
    models: [
      { id: 'hatch-1', name: 'Swift', image: swiftImg },
      { id: 'hatch-2', name: 'Baleno', image: balenoImg },
      { id: 'hatch-3', name: 'Tiago', image: tiagoImg },
      { id: 'hatch-4', name: 'i20', image: i20Img },
    ],
  },
  {
    type: 'Sedan',
    models: [
      { id: 'sedan-1', name: 'Dzire', image: dzireImg },
      { id: 'sedan-2', name: 'Verna', image: vernaImg },
      { id: 'sedan-3', name: 'Virtus', image: virtusImg },
      { id: 'sedan-4', name: 'City', image: cityImg },
    ],
  },
  {
    type: 'SUV',
    models: [
      { id: 'suv-1', name: 'XUV700', image: xuv700Img },
      { id: 'suv-2', name: 'Creta', image: cretaImg },
      { id: 'suv-3', name: 'Nexon', image: nexonImg },
      { id: 'suv-4', name: 'Punch', image: punchImg },
    ],
  },
];

export default function Live3DPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const products = useStore((s) => s.allProducts || []);

  if (!id) {
    return (
      <section className="min-h-screen bg-black text-white p-8 pt-32">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-extrabold">Which type of car?</h1>
          <p className="text-gray-400 mt-2">Choose a car type and pick a model to continue to the model page.</p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {CATEGORIES.map((cat) => (
              <div key={cat.type} className="p-6 bg-white/5 rounded-lg border border-white/10">
                <h2 className="text-xl font-semibold">{cat.type}</h2>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {cat.models.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => navigate(`/sub3d/${m.id}`)}
                      className="flex flex-col items-start p-0 rounded-2xl overflow-hidden shadow-2xl transform transition duration-300 hover:-translate-y-2 hover:scale-105 border-2"
                      style={{
                        perspective: 800,
                        borderColor: '#ef4444',
                        backgroundImage: 'repeating-linear-gradient(45deg, rgba(0,0,0,0.65) 0 8px, rgba(255,255,255,0.02) 8px 16px)',
                        backgroundSize: '16px 16px'
                      }}
                    >
                      {m.image ? (
                        <img src={m.image} alt={m.name} className="w-full h-32 object-cover" />
                      ) : (
                        <div style={{backgroundImage: 'repeating-linear-gradient(45deg, rgba(0,0,0,0.65) 0 8px, rgba(255,255,255,0.02) 8px 16px)', backgroundSize: '16px 16px'}} className="w-full h-32 flex items-center justify-center text-red-300">No image</div>
                      )}
                      <div className="p-3 w-full text-left bg-black/40">
                        <div className="font-medium text-red-400">{m.name}</div>
                        <div className="text-sm text-red-300">{cat.type}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const model = useMemo(() => {
    for (const cat of CATEGORIES) {
      const found = cat.models.find((m) => String(m.id) === String(id));
      if (found) return { ...found, type: cat.type };
    }
    return null;
  }, [id]);

  if (model) {
    return (
      <section className="min-h-screen bg-black text-white p-8 pt-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-extrabold">{model.name}</h1>
          <p className="text-gray-400 mt-2">Type: {model.type}</p>

          <div className="mt-6 flex gap-3">
            <button onClick={() => navigate(-1)} className="px-4 py-2 bg-white/10 rounded">Back</button>
            <button onClick={() => navigate(`/sub3d/${model.id}`)} className="px-4 py-2 bg-red-500 rounded">Open Sub3D</button>
          </div>
        </div>
      </section>
    );
  }

  const product = products.find((p) => String(p.id) === String(id));

  if (!product) {
    return (
      <section className="min-h-screen bg-black text-white p-8 pt-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">Item not found</h1>
          <p className="mt-4 text-gray-400">No product or model matches id {id}.</p>
          <button className="mt-6 px-4 py-2 bg-white/10 rounded" onClick={() => navigate(-1)}>Back</button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black text-white p-8 pt-32">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold">{product.title}</h1>
        <p className="text-gray-400 mt-2">Brand: {product.brand} • Category: {product.category}</p>
        <div className="mt-6">
          <button onClick={() => alert('Open 3D editor for product (placeholder)')} className="px-4 py-2 bg-red-500 rounded">Open 3D Editor</button>
          <button onClick={() => navigate(-1)} className="ml-3 px-4 py-2 bg-white/10 rounded">Back</button>
        </div>
      </div>
    </section>
  );
}


