import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';

const CATEGORIES = [
  {
    type: 'Hatchback',
    models: [
      { id: 'hatch-1', name: 'Swift' },
      { id: 'hatch-2', name: 'Baleno' },
      { id: 'hatch-3', name: 'Tiago' },
      { id: 'hatch-4', name: 'i20' },
    ],
  },
  {
    type: 'Sedan',
    models: [
      { id: 'sedan-1', name: 'Dzire' },
      { id: 'sedan-2', name: 'Verna' },
      { id: 'sedan-3', name: 'Virtus' },
      { id: 'sedan-4', name: 'City' },
    ],
  },
  {
    type: 'SUV',
    models: [
      { id: 'suv-1', name: 'XUV700' },
      { id: 'suv-2', name: 'Creta' },
      { id: 'suv-3', name: 'Nexon' },
      { id: 'suv-4', name: 'Punch' },
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
                      onClick={() => navigate(`/live3d/${m.id}`)}
                      className="p-3 bg-white/6 hover:bg-white/10 rounded text-left"
                    >
                      <div className="font-medium">{m.name}</div>
                      <div className="text-sm text-gray-300">{cat.type}</div>
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
            <button onClick={() => navigate(`/product/placeholder-${model.id}`)} className="px-4 py-2 bg-red-500 rounded">Open Editor (placeholder)</button>
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


