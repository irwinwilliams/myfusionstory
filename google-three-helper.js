(() => {
  "use strict";
  var e = {
      d: (t, s) => {
        for (var n in s)
          e.o(s, n) &&
            !e.o(t, n) &&
            Object.defineProperty(t, n, { enumerable: !0, get: s[n] });
      },
      o: (e, t) => Object.prototype.hasOwnProperty.call(e, t),
      r: e => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
          }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      }
    },
    t = {};
  e.r(t), e.d(t, { initMap: () => j });
  const s = window.THREE;
  class n extends s.Loader {
    constructor(e) {
      super(e),
        (this.dracoLoader = null),
        (this.ktx2Loader = null),
        (this.meshoptDecoder = null),
        (this.pluginCallbacks = []),
        this.register(function(e) {
          return new l(e);
        }),
        this.register(function(e) {
          return new u(e);
        }),
        this.register(function(e) {
          return new h(e);
        }),
        this.register(function(e) {
          return new c(e);
        }),
        this.register(function(e) {
          return new a(e);
        }),
        this.register(function(e) {
          return new d(e);
        });
    }
    load(e, t, n, r) {
      const o = this;
      let a;
      (a =
        "" !== this.resourcePath
          ? this.resourcePath
          : "" !== this.path
          ? this.path
          : s.LoaderUtils.extractUrlBase(e)),
        this.manager.itemStart(e);
      const i = function(t) {
          r ? r(t) : console.error(t),
            o.manager.itemError(e),
            o.manager.itemEnd(e);
        },
        l = new s.FileLoader(this.manager);
      l.setPath(this.path),
        l.setResponseType("arraybuffer"),
        l.setRequestHeader(this.requestHeader),
        l.setWithCredentials(this.withCredentials),
        l.load(
          e,
          function(s) {
            try {
              o.parse(
                s,
                a,
                function(s) {
                  t(s), o.manager.itemEnd(e);
                },
                i
              );
            } catch (e) {
              i(e);
            }
          },
          n,
          i
        );
    }
    setDRACOLoader(e) {
      return (this.dracoLoader = e), this;
    }
    setDDSLoader() {
      throw new Error(
        'THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".'
      );
    }
    setKTX2Loader(e) {
      return (this.ktx2Loader = e), this;
    }
    setMeshoptDecoder(e) {
      return (this.meshoptDecoder = e), this;
    }
    register(e) {
      return (
        -1 === this.pluginCallbacks.indexOf(e) && this.pluginCallbacks.push(e),
        this
      );
    }
    unregister(e) {
      return (
        -1 !== this.pluginCallbacks.indexOf(e) &&
          this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1),
        this
      );
    }
    parse(e, t, n, r) {
      let a;
      const l = {},
        c = {};
      if ("string" == typeof e) a = e;
      else if (s.LoaderUtils.decodeText(new Uint8Array(e, 0, 4)) === p) {
        try {
          l[o.KHR_BINARY_GLTF] = new m(e);
        } catch (e) {
          return void (r && r(e));
        }
        a = l[o.KHR_BINARY_GLTF].content;
      } else a = s.LoaderUtils.decodeText(new Uint8Array(e));
      const u = JSON.parse(a);
      if (void 0 === u.asset || u.asset.version[0] < 2)
        return void (
          r &&
          r(
            new Error(
              "THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."
            )
          )
        );
      const h = new F(u, {
        path: t || this.resourcePath || "",
        crossOrigin: this.crossOrigin,
        requestHeader: this.requestHeader,
        manager: this.manager,
        ktx2Loader: this.ktx2Loader,
        meshoptDecoder: this.meshoptDecoder
      });
      h.fileLoader.setRequestHeader(this.requestHeader);
      for (let e = 0; e < this.pluginCallbacks.length; e++) {
        const t = this.pluginCallbacks[e](h);
        (c[t.name] = t), (l[t.name] = !0);
      }
      if (u.extensionsUsed)
        for (let e = 0; e < u.extensionsUsed.length; ++e) {
          const t = u.extensionsUsed[e],
            s = u.extensionsRequired || [];
          switch (t) {
            case o.KHR_MATERIALS_UNLIT:
              l[t] = new i();
              break;
            case o.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:
              l[t] = new x();
              break;
            case o.KHR_DRACO_MESH_COMPRESSION:
              l[t] = new f(u, this.dracoLoader);
              break;
            case o.KHR_TEXTURE_TRANSFORM:
              l[t] = new g();
              break;
            case o.KHR_MESH_QUANTIZATION:
              l[t] = new v();
              break;
            default:
              s.indexOf(t) >= 0 &&
                void 0 === c[t] &&
                console.warn(
                  'THREE.GLTFLoader: Unknown extension "' + t + '".'
                );
          }
        }
      h.setExtensions(l), h.setPlugins(c), h.parse(n, r);
    }
  }
  function r() {
    let e = {};
    return {
      get: function(t) {
        return e[t];
      },
      add: function(t, s) {
        e[t] = s;
      },
      remove: function(t) {
        delete e[t];
      },
      removeAll: function() {
        e = {};
      }
    };
  }
  const o = {
    KHR_BINARY_GLTF: "KHR_binary_glTF",
    KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
    KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
    KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
    KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:
      "KHR_materials_pbrSpecularGlossiness",
    KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
    KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
    KHR_TEXTURE_BASISU: "KHR_texture_basisu",
    KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
    KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
    EXT_TEXTURE_WEBP: "EXT_texture_webp",
    EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression"
  };
  class a {
    constructor(e) {
      (this.parser = e),
        (this.name = o.KHR_LIGHTS_PUNCTUAL),
        (this.cache = { refs: {}, uses: {} });
    }
    _markDefs() {
      const e = this.parser,
        t = this.parser.json.nodes || [];
      for (let s = 0, n = t.length; s < n; s++) {
        const n = t[s];
        n.extensions &&
          n.extensions[this.name] &&
          void 0 !== n.extensions[this.name].light &&
          e._addNodeRef(this.cache, n.extensions[this.name].light);
      }
    }
    _loadLight(e) {
      const t = this.parser,
        n = "light:" + e;
      let r = t.cache.get(n);
      if (r) return r;
      const o = t.json,
        a = (((o.extensions && o.extensions[this.name]) || {}).lights || [])[e];
      let i;
      const l = new s.Color(16777215);
      void 0 !== a.color && l.fromArray(a.color);
      const c = void 0 !== a.range ? a.range : 0;
      switch (a.type) {
        case "directional":
          (i = new s.DirectionalLight(l)),
            i.target.position.set(0, 0, -1),
            i.add(i.target);
          break;
        case "point":
          (i = new s.PointLight(l)), (i.distance = c);
          break;
        case "spot":
          (i = new s.SpotLight(l)),
            (i.distance = c),
            (a.spot = a.spot || {}),
            (a.spot.innerConeAngle =
              void 0 !== a.spot.innerConeAngle ? a.spot.innerConeAngle : 0),
            (a.spot.outerConeAngle =
              void 0 !== a.spot.outerConeAngle
                ? a.spot.outerConeAngle
                : Math.PI / 4),
            (i.angle = a.spot.outerConeAngle),
            (i.penumbra = 1 - a.spot.innerConeAngle / a.spot.outerConeAngle),
            i.target.position.set(0, 0, -1),
            i.add(i.target);
          break;
        default:
          throw new Error("THREE.GLTFLoader: Unexpected light type: " + a.type);
      }
      return (
        i.position.set(0, 0, 0),
        (i.decay = 2),
        void 0 !== a.intensity && (i.intensity = a.intensity),
        (i.name = t.createUniqueName(a.name || "light_" + e)),
        (r = Promise.resolve(i)),
        t.cache.add(n, r),
        r
      );
    }
    createNodeAttachment(e) {
      const t = this,
        s = this.parser,
        n = s.json.nodes[e],
        r = ((n.extensions && n.extensions[this.name]) || {}).light;
      return void 0 === r
        ? null
        : this._loadLight(r).then(function(e) {
            return s._getNodeRef(t.cache, r, e);
          });
    }
  }
  class i {
    constructor() {
      this.name = o.KHR_MATERIALS_UNLIT;
    }
    getMaterialType() {
      return s.MeshBasicMaterial;
    }
    extendParams(e, t, n) {
      const r = [];
      (e.color = new s.Color(1, 1, 1)), (e.opacity = 1);
      const o = t.pbrMetallicRoughness;
      if (o) {
        if (Array.isArray(o.baseColorFactor)) {
          const t = o.baseColorFactor;
          e.color.fromArray(t), (e.opacity = t[3]);
        }
        void 0 !== o.baseColorTexture &&
          r.push(n.assignTexture(e, "map", o.baseColorTexture));
      }
      return Promise.all(r);
    }
  }
  class l {
    constructor(e) {
      (this.parser = e), (this.name = o.KHR_MATERIALS_CLEARCOAT);
    }
    getMaterialType(e) {
      const t = this.parser.json.materials[e];
      return t.extensions && t.extensions[this.name]
        ? s.MeshPhysicalMaterial
        : null;
    }
    extendMaterialParams(e, t) {
      const n = this.parser,
        r = n.json.materials[e];
      if (!r.extensions || !r.extensions[this.name]) return Promise.resolve();
      const o = [],
        a = r.extensions[this.name];
      if (
        (void 0 !== a.clearcoatFactor && (t.clearcoat = a.clearcoatFactor),
        void 0 !== a.clearcoatTexture &&
          o.push(n.assignTexture(t, "clearcoatMap", a.clearcoatTexture)),
        void 0 !== a.clearcoatRoughnessFactor &&
          (t.clearcoatRoughness = a.clearcoatRoughnessFactor),
        void 0 !== a.clearcoatRoughnessTexture &&
          o.push(
            n.assignTexture(
              t,
              "clearcoatRoughnessMap",
              a.clearcoatRoughnessTexture
            )
          ),
        void 0 !== a.clearcoatNormalTexture &&
          (o.push(
            n.assignTexture(t, "clearcoatNormalMap", a.clearcoatNormalTexture)
          ),
          void 0 !== a.clearcoatNormalTexture.scale))
      ) {
        const e = a.clearcoatNormalTexture.scale;
        t.clearcoatNormalScale = new s.Vector2(e, -e);
      }
      return Promise.all(o);
    }
  }
  class c {
    constructor(e) {
      (this.parser = e), (this.name = o.KHR_MATERIALS_TRANSMISSION);
    }
    getMaterialType(e) {
      const t = this.parser.json.materials[e];
      return t.extensions && t.extensions[this.name]
        ? s.MeshPhysicalMaterial
        : null;
    }
    extendMaterialParams(e, t) {
      const s = this.parser,
        n = s.json.materials[e];
      if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
      const r = [],
        o = n.extensions[this.name];
      return (
        void 0 !== o.transmissionFactor &&
          (t.transmission = o.transmissionFactor),
        void 0 !== o.transmissionTexture &&
          r.push(s.assignTexture(t, "transmissionMap", o.transmissionTexture)),
        Promise.all(r)
      );
    }
  }
  class u {
    constructor(e) {
      (this.parser = e), (this.name = o.KHR_TEXTURE_BASISU);
    }
    loadTexture(e) {
      const t = this.parser,
        s = t.json,
        n = s.textures[e];
      if (!n.extensions || !n.extensions[this.name]) return null;
      const r = n.extensions[this.name],
        o = s.images[r.source],
        a = t.options.ktx2Loader;
      if (!a) {
        if (
          s.extensionsRequired &&
          s.extensionsRequired.indexOf(this.name) >= 0
        )
          throw new Error(
            "THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures"
          );
        return null;
      }
      return t.loadTextureImage(e, o, a);
    }
  }
  class h {
    constructor(e) {
      (this.parser = e),
        (this.name = o.EXT_TEXTURE_WEBP),
        (this.isSupported = null);
    }
    loadTexture(e) {
      const t = this.name,
        s = this.parser,
        n = s.json,
        r = n.textures[e];
      if (!r.extensions || !r.extensions[t]) return null;
      const o = r.extensions[t],
        a = n.images[o.source];
      let i = s.textureLoader;
      if (a.uri) {
        const e = s.options.manager.getHandler(a.uri);
        null !== e && (i = e);
      }
      return this.detectSupport().then(function(r) {
        if (r) return s.loadTextureImage(e, a, i);
        if (n.extensionsRequired && n.extensionsRequired.indexOf(t) >= 0)
          throw new Error(
            "THREE.GLTFLoader: WebP required by asset but unsupported."
          );
        return s.loadTexture(e);
      });
    }
    detectSupport() {
      return (
        this.isSupported ||
          (this.isSupported = new Promise(function(e) {
            const t = new Image();
            (t.src =
              "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA"),
              (t.onload = t.onerror = function() {
                e(1 === t.height);
              });
          })),
        this.isSupported
      );
    }
  }
  class d {
    constructor(e) {
      (this.name = o.EXT_MESHOPT_COMPRESSION), (this.parser = e);
    }
    loadBufferView(e) {
      const t = this.parser.json,
        s = t.bufferViews[e];
      if (s.extensions && s.extensions[this.name]) {
        const e = s.extensions[this.name],
          n = this.parser.getDependency("buffer", e.buffer),
          r = this.parser.options.meshoptDecoder;
        if (!r || !r.supported) {
          if (
            t.extensionsRequired &&
            t.extensionsRequired.indexOf(this.name) >= 0
          )
            throw new Error(
              "THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files"
            );
          return null;
        }
        return Promise.all([n, r.ready]).then(function(t) {
          const s = e.byteOffset || 0,
            n = e.byteLength || 0,
            o = e.count,
            a = e.byteStride,
            i = new ArrayBuffer(o * a),
            l = new Uint8Array(t[0], s, n);
          return (
            r.decodeGltfBuffer(new Uint8Array(i), o, a, l, e.mode, e.filter), i
          );
        });
      }
      return null;
    }
  }
  const p = "glTF";
  class m {
    constructor(e) {
      (this.name = o.KHR_BINARY_GLTF),
        (this.content = null),
        (this.body = null);
      const t = new DataView(e, 0, 12);
      if (
        ((this.header = {
          magic: s.LoaderUtils.decodeText(new Uint8Array(e.slice(0, 4))),
          version: t.getUint32(4, !0),
          length: t.getUint32(8, !0)
        }),
        this.header.magic !== p)
      )
        throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
      if (this.header.version < 2)
        throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
      const n = this.header.length - 12,
        r = new DataView(e, 12);
      let a = 0;
      for (; a < n; ) {
        const t = r.getUint32(a, !0);
        a += 4;
        const n = r.getUint32(a, !0);
        if (((a += 4), 1313821514 === n)) {
          const n = new Uint8Array(e, 12 + a, t);
          this.content = s.LoaderUtils.decodeText(n);
        } else if (5130562 === n) {
          const s = 12 + a;
          this.body = e.slice(s, s + t);
        }
        a += t;
      }
      if (null === this.content)
        throw new Error("THREE.GLTFLoader: JSON content not found.");
    }
  }
  class f {
    constructor(e, t) {
      if (!t)
        throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
      (this.name = o.KHR_DRACO_MESH_COMPRESSION),
        (this.json = e),
        (this.dracoLoader = t),
        this.dracoLoader.preload();
    }
    decodePrimitive(e, t) {
      const s = this.json,
        n = this.dracoLoader,
        r = e.extensions[this.name].bufferView,
        o = e.extensions[this.name].attributes,
        a = {},
        i = {},
        l = {};
      for (const e in o) {
        const t = A[e] || e.toLowerCase();
        a[t] = o[e];
      }
      for (const t in e.attributes) {
        const n = A[t] || t.toLowerCase();
        if (void 0 !== o[t]) {
          const r = s.accessors[e.attributes[t]],
            o = y[r.componentType];
          (l[n] = o), (i[n] = !0 === r.normalized);
        }
      }
      return t.getDependency("bufferView", r).then(function(e) {
        return new Promise(function(t) {
          n.decodeDracoFile(
            e,
            function(e) {
              for (const t in e.attributes) {
                const s = e.attributes[t],
                  n = i[t];
                void 0 !== n && (s.normalized = n);
              }
              t(e);
            },
            a,
            l
          );
        });
      });
    }
  }
  class g {
    constructor() {
      this.name = o.KHR_TEXTURE_TRANSFORM;
    }
    extendTexture(e, t) {
      return (
        void 0 !== t.texCoord &&
          console.warn(
            'THREE.GLTFLoader: Custom UV sets in "' +
              this.name +
              '" extension not yet supported.'
          ),
        (void 0 === t.offset && void 0 === t.rotation && void 0 === t.scale) ||
          ((e = e.clone()),
          void 0 !== t.offset && e.offset.fromArray(t.offset),
          void 0 !== t.rotation && (e.rotation = t.rotation),
          void 0 !== t.scale && e.repeat.fromArray(t.scale),
          (e.needsUpdate = !0)),
        e
      );
    }
  }
  class T extends s.MeshStandardMaterial {
    constructor(e) {
      super(), (this.isGLTFSpecularGlossinessMaterial = !0);
      const t = [
          "#ifdef USE_SPECULARMAP",
          "\tuniform sampler2D specularMap;",
          "#endif"
        ].join("\n"),
        n = [
          "#ifdef USE_GLOSSINESSMAP",
          "\tuniform sampler2D glossinessMap;",
          "#endif"
        ].join("\n"),
        r = [
          "vec3 specularFactor = specular;",
          "#ifdef USE_SPECULARMAP",
          "\tvec4 texelSpecular = texture2D( specularMap, vUv );",
          "\ttexelSpecular = sRGBToLinear( texelSpecular );",
          "\t// reads channel RGB, compatible with a glTF Specular-Glossiness (RGBA) texture",
          "\tspecularFactor *= texelSpecular.rgb;",
          "#endif"
        ].join("\n"),
        o = [
          "float glossinessFactor = glossiness;",
          "#ifdef USE_GLOSSINESSMAP",
          "\tvec4 texelGlossiness = texture2D( glossinessMap, vUv );",
          "\t// reads channel A, compatible with a glTF Specular-Glossiness (RGBA) texture",
          "\tglossinessFactor *= texelGlossiness.a;",
          "#endif"
        ].join("\n"),
        a = [
          "PhysicalMaterial material;",
          "material.diffuseColor = diffuseColor.rgb * ( 1. - max( specularFactor.r, max( specularFactor.g, specularFactor.b ) ) );",
          "vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );",
          "float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );",
          "material.specularRoughness = max( 1.0 - glossinessFactor, 0.0525 ); // 0.0525 corresponds to the base mip of a 256 cubemap.",
          "material.specularRoughness += geometryRoughness;",
          "material.specularRoughness = min( material.specularRoughness, 1.0 );",
          "material.specularColor = specularFactor;"
        ].join("\n"),
        i = {
          specular: { value: new s.Color().setHex(16777215) },
          glossiness: { value: 1 },
          specularMap: { value: null },
          glossinessMap: { value: null }
        };
      (this._extraUniforms = i),
        (this.onBeforeCompile = function(e) {
          for (const t in i) e.uniforms[t] = i[t];
          e.fragmentShader = e.fragmentShader
            .replace("uniform float roughness;", "uniform vec3 specular;")
            .replace("uniform float metalness;", "uniform float glossiness;")
            .replace("#include <roughnessmap_pars_fragment>", t)
            .replace("#include <metalnessmap_pars_fragment>", n)
            .replace("#include <roughnessmap_fragment>", r)
            .replace("#include <metalnessmap_fragment>", o)
            .replace("#include <lights_physical_fragment>", a);
        }),
        Object.defineProperties(this, {
          specular: {
            get: function() {
              return i.specular.value;
            },
            set: function(e) {
              i.specular.value = e;
            }
          },
          specularMap: {
            get: function() {
              return i.specularMap.value;
            },
            set: function(e) {
              (i.specularMap.value = e),
                e
                  ? (this.defines.USE_SPECULARMAP = "")
                  : delete this.defines.USE_SPECULARMAP;
            }
          },
          glossiness: {
            get: function() {
              return i.glossiness.value;
            },
            set: function(e) {
              i.glossiness.value = e;
            }
          },
          glossinessMap: {
            get: function() {
              return i.glossinessMap.value;
            },
            set: function(e) {
              (i.glossinessMap.value = e),
                e
                  ? ((this.defines.USE_GLOSSINESSMAP = ""),
                    (this.defines.USE_UV = ""))
                  : (delete this.defines.USE_GLOSSINESSMAP,
                    delete this.defines.USE_UV);
            }
          }
        }),
        delete this.metalness,
        delete this.roughness,
        delete this.metalnessMap,
        delete this.roughnessMap,
        this.setValues(e);
    }
    copy(e) {
      return (
        super.copy(e),
        (this.specularMap = e.specularMap),
        this.specular.copy(e.specular),
        (this.glossinessMap = e.glossinessMap),
        (this.glossiness = e.glossiness),
        delete this.metalness,
        delete this.roughness,
        delete this.metalnessMap,
        delete this.roughnessMap,
        this
      );
    }
  }
  class x {
    constructor() {
      (this.name = o.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS),
        (this.specularGlossinessParams = [
          "color",
          "map",
          "lightMap",
          "lightMapIntensity",
          "aoMap",
          "aoMapIntensity",
          "emissive",
          "emissiveIntensity",
          "emissiveMap",
          "bumpMap",
          "bumpScale",
          "normalMap",
          "normalMapType",
          "displacementMap",
          "displacementScale",
          "displacementBias",
          "specularMap",
          "specular",
          "glossinessMap",
          "glossiness",
          "alphaMap",
          "envMap",
          "envMapIntensity",
          "refractionRatio"
        ]);
    }
    getMaterialType() {
      return T;
    }
    extendParams(e, t, n) {
      const r = t.extensions[this.name];
      (e.color = new s.Color(1, 1, 1)), (e.opacity = 1);
      const o = [];
      if (Array.isArray(r.diffuseFactor)) {
        const t = r.diffuseFactor;
        e.color.fromArray(t), (e.opacity = t[3]);
      }
      if (
        (void 0 !== r.diffuseTexture &&
          o.push(n.assignTexture(e, "map", r.diffuseTexture)),
        (e.emissive = new s.Color(0, 0, 0)),
        (e.glossiness = void 0 !== r.glossinessFactor ? r.glossinessFactor : 1),
        (e.specular = new s.Color(1, 1, 1)),
        Array.isArray(r.specularFactor) &&
          e.specular.fromArray(r.specularFactor),
        void 0 !== r.specularGlossinessTexture)
      ) {
        const t = r.specularGlossinessTexture;
        o.push(n.assignTexture(e, "glossinessMap", t)),
          o.push(n.assignTexture(e, "specularMap", t));
      }
      return Promise.all(o);
    }
    createMaterial(e) {
      const t = new T(e);
      return (
        (t.fog = !0),
        (t.color = e.color),
        (t.map = void 0 === e.map ? null : e.map),
        (t.lightMap = null),
        (t.lightMapIntensity = 1),
        (t.aoMap = void 0 === e.aoMap ? null : e.aoMap),
        (t.aoMapIntensity = 1),
        (t.emissive = e.emissive),
        (t.emissiveIntensity = 1),
        (t.emissiveMap = void 0 === e.emissiveMap ? null : e.emissiveMap),
        (t.bumpMap = void 0 === e.bumpMap ? null : e.bumpMap),
        (t.bumpScale = 1),
        (t.normalMap = void 0 === e.normalMap ? null : e.normalMap),
        (t.normalMapType = s.TangentSpaceNormalMap),
        e.normalScale && (t.normalScale = e.normalScale),
        (t.displacementMap = null),
        (t.displacementScale = 1),
        (t.displacementBias = 0),
        (t.specularMap = void 0 === e.specularMap ? null : e.specularMap),
        (t.specular = e.specular),
        (t.glossinessMap = void 0 === e.glossinessMap ? null : e.glossinessMap),
        (t.glossiness = e.glossiness),
        (t.alphaMap = null),
        (t.envMap = void 0 === e.envMap ? null : e.envMap),
        (t.envMapIntensity = 1),
        (t.refractionRatio = 0.98),
        t
      );
    }
  }
  class v {
    constructor() {
      this.name = o.KHR_MESH_QUANTIZATION;
    }
  }
  class M extends s.Interpolant {
    constructor(e, t, s, n) {
      super(e, t, s, n);
    }
    copySampleValue_(e) {
      const t = this.resultBuffer,
        s = this.sampleValues,
        n = this.valueSize,
        r = e * n * 3 + n;
      for (let e = 0; e !== n; e++) t[e] = s[r + e];
      return t;
    }
  }
  (M.prototype.beforeStart_ = M.prototype.copySampleValue_),
    (M.prototype.afterEnd_ = M.prototype.copySampleValue_),
    (M.prototype.interpolate_ = function(e, t, s, n) {
      const r = this.resultBuffer,
        o = this.sampleValues,
        a = this.valueSize,
        i = 2 * a,
        l = 3 * a,
        c = n - t,
        u = (s - t) / c,
        h = u * u,
        d = h * u,
        p = e * l,
        m = p - l,
        f = -2 * d + 3 * h,
        g = d - h,
        T = 1 - f,
        x = g - h + u;
      for (let e = 0; e !== a; e++) {
        const t = o[m + e + a],
          s = o[m + e + i] * c,
          n = o[p + e + a],
          l = o[p + e] * c;
        r[e] = T * t + x * s + f * n + g * l;
      }
      return r;
    });
  const y = {
      5120: Int8Array,
      5121: Uint8Array,
      5122: Int16Array,
      5123: Uint16Array,
      5125: Uint32Array,
      5126: Float32Array
    },
    R = {
      9728: s.NearestFilter,
      9729: s.LinearFilter,
      9984: s.NearestMipmapNearestFilter,
      9985: s.LinearMipmapNearestFilter,
      9986: s.NearestMipmapLinearFilter,
      9987: s.LinearMipmapLinearFilter
    },
    S = {
      33071: s.ClampToEdgeWrapping,
      33648: s.MirroredRepeatWrapping,
      10497: s.RepeatWrapping
    },
    w = {
      SCALAR: 1,
      VEC2: 2,
      VEC3: 3,
      VEC4: 4,
      MAT2: 4,
      MAT3: 9,
      MAT4: 16
    },
    A = {
      POSITION: "position",
      NORMAL: "normal",
      TANGENT: "tangent",
      TEXCOORD_0: "uv",
      TEXCOORD_1: "uv2",
      COLOR_0: "color",
      WEIGHTS_0: "skinWeight",
      JOINTS_0: "skinIndex"
    },
    b = {
      scale: "scale",
      translation: "position",
      rotation: "quaternion",
      weights: "morphTargetInfluences"
    },
    _ = {
      CUBICSPLINE: void 0,
      LINEAR: s.InterpolateLinear,
      STEP: s.InterpolateDiscrete
    };
  function E(e, t) {
    return "string" != typeof e || "" === e
      ? ""
      : (/^https?:\/\//i.test(t) &&
          /^\//.test(e) &&
          (t = t.replace(/(^https?:\/\/[^\/]+).*/i, "$1")),
        /^(https?:)?\/\//i.test(e) ||
        /^data:.*,.*$/i.test(e) ||
        /^blob:.*$/i.test(e)
          ? e
          : t + e);
  }
  function L(e, t, s) {
    for (const n in s.extensions)
      void 0 === e[n] &&
        ((t.userData.gltfExtensions = t.userData.gltfExtensions || {}),
        (t.userData.gltfExtensions[n] = s.extensions[n]));
  }
  function I(e, t) {
    void 0 !== t.extras &&
      ("object" == typeof t.extras
        ? Object.assign(e.userData, t.extras)
        : console.warn(
            "THREE.GLTFLoader: Ignoring primitive type .extras, " + t.extras
          ));
  }
  function P(e, t) {
    if ((e.updateMorphTargets(), void 0 !== t.weights))
      for (let s = 0, n = t.weights.length; s < n; s++)
        e.morphTargetInfluences[s] = t.weights[s];
    if (t.extras && Array.isArray(t.extras.targetNames)) {
      const s = t.extras.targetNames;
      if (e.morphTargetInfluences.length === s.length) {
        e.morphTargetDictionary = {};
        for (let t = 0, n = s.length; t < n; t++)
          e.morphTargetDictionary[s[t]] = t;
      } else
        console.warn(
          "THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names."
        );
    }
  }
  function C(e) {
    const t = e.extensions && e.extensions[o.KHR_DRACO_MESH_COMPRESSION];
    let s;
    return (
      (s = t
        ? "draco:" + t.bufferView + ":" + t.indices + ":" + O(t.attributes)
        : e.indices + ":" + O(e.attributes) + ":" + e.mode),
      s
    );
  }
  function O(e) {
    let t = "";
    const s = Object.keys(e).sort();
    for (let n = 0, r = s.length; n < r; n++) t += s[n] + ":" + e[s[n]] + ";";
    return t;
  }
  function N(e) {
    switch (e) {
      case Int8Array:
        return 1 / 127;
      case Uint8Array:
        return 1 / 255;
      case Int16Array:
        return 1 / 32767;
      case Uint16Array:
        return 1 / 65535;
      default:
        throw new Error(
          "THREE.GLTFLoader: Unsupported normalized accessor component type."
        );
    }
  }
  class F {
    constructor(e = {}, t = {}) {
      (this.json = e),
        (this.extensions = {}),
        (this.plugins = {}),
        (this.options = t),
        (this.cache = new r()),
        (this.associations = new Map()),
        (this.primitiveCache = {}),
        (this.meshCache = { refs: {}, uses: {} }),
        (this.cameraCache = { refs: {}, uses: {} }),
        (this.lightCache = { refs: {}, uses: {} }),
        (this.textureCache = {}),
        (this.nodeNamesUsed = {}),
        "undefined" != typeof createImageBitmap &&
        !1 === /Firefox/.test(navigator.userAgent)
          ? (this.textureLoader = new s.ImageBitmapLoader(this.options.manager))
          : (this.textureLoader = new s.TextureLoader(this.options.manager)),
        this.textureLoader.setCrossOrigin(this.options.crossOrigin),
        this.textureLoader.setRequestHeader(this.options.requestHeader),
        (this.fileLoader = new s.FileLoader(this.options.manager)),
        this.fileLoader.setResponseType("arraybuffer"),
        "use-credentials" === this.options.crossOrigin &&
          this.fileLoader.setWithCredentials(!0);
    }
    setExtensions(e) {
      this.extensions = e;
    }
    setPlugins(e) {
      this.plugins = e;
    }
    parse(e, t) {
      const s = this,
        n = this.json,
        r = this.extensions;
      this.cache.removeAll(),
        this._invokeAll(function(e) {
          return e._markDefs && e._markDefs();
        }),
        Promise.all(
          this._invokeAll(function(e) {
            return e.beforeRoot && e.beforeRoot();
          })
        )
          .then(function() {
            return Promise.all([
              s.getDependencies("scene"),
              s.getDependencies("animation"),
              s.getDependencies("camera")
            ]);
          })
          .then(function(t) {
            const o = {
              scene: t[0][n.scene || 0],
              scenes: t[0],
              animations: t[1],
              cameras: t[2],
              asset: n.asset,
              parser: s,
              userData: {}
            };
            L(r, o, n),
              I(o, n),
              Promise.all(
                s._invokeAll(function(e) {
                  return e.afterRoot && e.afterRoot(o);
                })
              ).then(function() {
                e(o);
              });
          })
          .catch(t);
    }
    _markDefs() {
      const e = this.json.nodes || [],
        t = this.json.skins || [],
        s = this.json.meshes || [];
      for (let s = 0, n = t.length; s < n; s++) {
        const n = t[s].joints;
        for (let t = 0, s = n.length; t < s; t++) e[n[t]].isBone = !0;
      }
      for (let t = 0, n = e.length; t < n; t++) {
        const n = e[t];
        void 0 !== n.mesh &&
          (this._addNodeRef(this.meshCache, n.mesh),
          void 0 !== n.skin && (s[n.mesh].isSkinnedMesh = !0)),
          void 0 !== n.camera && this._addNodeRef(this.cameraCache, n.camera);
      }
    }
    _addNodeRef(e, t) {
      void 0 !== t &&
        (void 0 === e.refs[t] && (e.refs[t] = e.uses[t] = 0), e.refs[t]++);
    }
    _getNodeRef(e, t, s) {
      if (e.refs[t] <= 1) return s;
      const n = s.clone();
      return (n.name += "_instance_" + e.uses[t]++), n;
    }
    _invokeOne(e) {
      const t = Object.values(this.plugins);
      t.push(this);
      for (let s = 0; s < t.length; s++) {
        const n = e(t[s]);
        if (n) return n;
      }
      return null;
    }
    _invokeAll(e) {
      const t = Object.values(this.plugins);
      t.unshift(this);
      const s = [];
      for (let n = 0; n < t.length; n++) {
        const r = e(t[n]);
        r && s.push(r);
      }
      return s;
    }
    getDependency(e, t) {
      const s = e + ":" + t;
      let n = this.cache.get(s);
      if (!n) {
        switch (e) {
          case "scene":
            n = this.loadScene(t);
            break;
          case "node":
            n = this.loadNode(t);
            break;
          case "mesh":
            n = this._invokeOne(function(e) {
              return e.loadMesh && e.loadMesh(t);
            });
            break;
          case "accessor":
            n = this.loadAccessor(t);
            break;
          case "bufferView":
            n = this._invokeOne(function(e) {
              return e.loadBufferView && e.loadBufferView(t);
            });
            break;
          case "buffer":
            n = this.loadBuffer(t);
            break;
          case "material":
            n = this._invokeOne(function(e) {
              return e.loadMaterial && e.loadMaterial(t);
            });
            break;
          case "texture":
            n = this._invokeOne(function(e) {
              return e.loadTexture && e.loadTexture(t);
            });
            break;
          case "skin":
            n = this.loadSkin(t);
            break;
          case "animation":
            n = this.loadAnimation(t);
            break;
          case "camera":
            n = this.loadCamera(t);
            break;
          default:
            throw new Error("Unknown type: " + e);
        }
        this.cache.add(s, n);
      }
      return n;
    }
    getDependencies(e) {
      let t = this.cache.get(e);
      if (!t) {
        const s = this,
          n = this.json[e + ("mesh" === e ? "es" : "s")] || [];
        (t = Promise.all(
          n.map(function(t, n) {
            return s.getDependency(e, n);
          })
        )),
          this.cache.add(e, t);
      }
      return t;
    }
    loadBuffer(e) {
      const t = this.json.buffers[e],
        s = this.fileLoader;
      if (t.type && "arraybuffer" !== t.type)
        throw new Error(
          "THREE.GLTFLoader: " + t.type + " buffer type is not supported."
        );
      if (void 0 === t.uri && 0 === e)
        return Promise.resolve(this.extensions[o.KHR_BINARY_GLTF].body);
      const n = this.options;
      return new Promise(function(e, r) {
        s.load(E(t.uri, n.path), e, void 0, function() {
          r(
            new Error(
              'THREE.GLTFLoader: Failed to load buffer "' + t.uri + '".'
            )
          );
        });
      });
    }
    loadBufferView(e) {
      const t = this.json.bufferViews[e];
      return this.getDependency("buffer", t.buffer).then(function(e) {
        const s = t.byteLength || 0,
          n = t.byteOffset || 0;
        return e.slice(n, n + s);
      });
    }
    loadAccessor(e) {
      const t = this,
        n = this.json,
        r = this.json.accessors[e];
      if (void 0 === r.bufferView && void 0 === r.sparse)
        return Promise.resolve(null);
      const o = [];
      return (
        void 0 !== r.bufferView
          ? o.push(this.getDependency("bufferView", r.bufferView))
          : o.push(null),
        void 0 !== r.sparse &&
          (o.push(
            this.getDependency("bufferView", r.sparse.indices.bufferView)
          ),
          o.push(this.getDependency("bufferView", r.sparse.values.bufferView))),
        Promise.all(o).then(function(e) {
          const o = e[0],
            a = w[r.type],
            i = y[r.componentType],
            l = i.BYTES_PER_ELEMENT,
            c = l * a,
            u = r.byteOffset || 0,
            h =
              void 0 !== r.bufferView
                ? n.bufferViews[r.bufferView].byteStride
                : void 0,
            d = !0 === r.normalized;
          let p, m;
          if (h && h !== c) {
            const e = Math.floor(u / h),
              n =
                "InterleavedBuffer:" +
                r.bufferView +
                ":" +
                r.componentType +
                ":" +
                e +
                ":" +
                r.count;
            let c = t.cache.get(n);
            c ||
              ((p = new i(o, e * h, (r.count * h) / l)),
              (c = new s.InterleavedBuffer(p, h / l)),
              t.cache.add(n, c)),
              (m = new s.InterleavedBufferAttribute(c, a, (u % h) / l, d));
          } else (p = null === o ? new i(r.count * a) : new i(o, u, r.count * a)), (m = new s.BufferAttribute(p, a, d));
          if (void 0 !== r.sparse) {
            const t = w.SCALAR,
              n = y[r.sparse.indices.componentType],
              l = r.sparse.indices.byteOffset || 0,
              c = r.sparse.values.byteOffset || 0,
              u = new n(e[1], l, r.sparse.count * t),
              h = new i(e[2], c, r.sparse.count * a);
            null !== o &&
              (m = new s.BufferAttribute(
                m.array.slice(),
                m.itemSize,
                m.normalized
              ));
            for (let e = 0, t = u.length; e < t; e++) {
              const t = u[e];
              if (
                (m.setX(t, h[e * a]),
                a >= 2 && m.setY(t, h[e * a + 1]),
                a >= 3 && m.setZ(t, h[e * a + 2]),
                a >= 4 && m.setW(t, h[e * a + 3]),
                a >= 5)
              )
                throw new Error(
                  "THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute."
                );
            }
          }
          return m;
        })
      );
    }
    loadTexture(e) {
      const t = this.json,
        s = this.options,
        n = t.textures[e],
        r = t.images[n.source];
      let o = this.textureLoader;
      if (r.uri) {
        const e = s.manager.getHandler(r.uri);
        null !== e && (o = e);
      }
      return this.loadTextureImage(e, r, o);
    }
    loadTextureImage(e, t, n) {
      const r = this,
        o = this.json,
        a = this.options,
        i = o.textures[e],
        l = (t.uri || t.bufferView) + ":" + i.sampler;
      if (this.textureCache[l]) return this.textureCache[l];
      const c = self.URL || self.webkitURL;
      let u = t.uri || "",
        h = !1,
        d = !0;
      const p =
        u.search(/\.jpe?g($|\?)/i) > 0 || 0 === u.search(/^data\:image\/jpeg/);
      if (
        (("image/jpeg" === t.mimeType || p) && (d = !1),
        void 0 !== t.bufferView)
      )
        u = r.getDependency("bufferView", t.bufferView).then(function(e) {
          if ("image/png" === t.mimeType) {
            const t = new DataView(e, 25, 1).getUint8(0, !1);
            d = 6 === t || 4 === t || 3 === t;
          }
          h = !0;
          const s = new Blob([e], { type: t.mimeType });
          return (u = c.createObjectURL(s)), u;
        });
      else if (void 0 === t.uri)
        throw new Error(
          "THREE.GLTFLoader: Image " + e + " is missing URI and bufferView"
        );
      const m = Promise.resolve(u)
        .then(function(e) {
          return new Promise(function(t, r) {
            let o = t;
            !0 === n.isImageBitmapLoader &&
              (o = function(e) {
                t(new s.CanvasTexture(e));
              }),
              n.load(E(e, a.path), o, void 0, r);
          });
        })
        .then(function(t) {
          !0 === h && c.revokeObjectURL(u),
            (t.flipY = !1),
            i.name && (t.name = i.name),
            d || (t.format = s.RGBFormat);
          const n = (o.samplers || {})[i.sampler] || {};
          return (
            (t.magFilter = R[n.magFilter] || s.LinearFilter),
            (t.minFilter = R[n.minFilter] || s.LinearMipmapLinearFilter),
            (t.wrapS = S[n.wrapS] || s.RepeatWrapping),
            (t.wrapT = S[n.wrapT] || s.RepeatWrapping),
            r.associations.set(t, { type: "textures", index: e }),
            t
          );
        });
      return (this.textureCache[l] = m), m;
    }
    assignTexture(e, t, s) {
      const n = this;
      return this.getDependency("texture", s.index).then(function(r) {
        if (
          (void 0 === s.texCoord ||
            0 == s.texCoord ||
            ("aoMap" === t && 1 == s.texCoord) ||
            console.warn(
              "THREE.GLTFLoader: Custom UV set " +
                s.texCoord +
                " for texture " +
                t +
                " not yet supported."
            ),
          n.extensions[o.KHR_TEXTURE_TRANSFORM])
        ) {
          const e =
            void 0 !== s.extensions
              ? s.extensions[o.KHR_TEXTURE_TRANSFORM]
              : void 0;
          if (e) {
            const t = n.associations.get(r);
            (r = n.extensions[o.KHR_TEXTURE_TRANSFORM].extendTexture(r, e)),
              n.associations.set(r, t);
          }
        }
        e[t] = r;
      });
    }
    assignFinalMaterial(e) {
      const t = e.geometry;
      let n = e.material;
      const r = void 0 !== t.attributes.tangent,
        o = void 0 !== t.attributes.color,
        a = void 0 === t.attributes.normal,
        i = Object.keys(t.morphAttributes).length > 0,
        l = i && void 0 !== t.morphAttributes.normal;
      if (e.isPoints) {
        const e = "PointsMaterial:" + n.uuid;
        let t = this.cache.get(e);
        t ||
          ((t = new s.PointsMaterial()),
          s.Material.prototype.copy.call(t, n),
          t.color.copy(n.color),
          (t.map = n.map),
          (t.sizeAttenuation = !1),
          this.cache.add(e, t)),
          (n = t);
      } else if (e.isLine) {
        const e = "LineBasicMaterial:" + n.uuid;
        let t = this.cache.get(e);
        t ||
          ((t = new s.LineBasicMaterial()),
          s.Material.prototype.copy.call(t, n),
          t.color.copy(n.color),
          this.cache.add(e, t)),
          (n = t);
      }
      if (r || o || a || i) {
        let e = "ClonedMaterial:" + n.uuid + ":";
        n.isGLTFSpecularGlossinessMaterial && (e += "specular-glossiness:"),
          r && (e += "vertex-tangents:"),
          o && (e += "vertex-colors:"),
          a && (e += "flat-shading:"),
          i && (e += "morph-targets:"),
          l && (e += "morph-normals:");
        let t = this.cache.get(e);
        t ||
          ((t = n.clone()),
          o && (t.vertexColors = !0),
          a && (t.flatShading = !0),
          i && (t.morphTargets = !0),
          l && (t.morphNormals = !0),
          r &&
            ((t.vertexTangents = !0),
            t.normalScale && (t.normalScale.y *= -1),
            t.clearcoatNormalScale && (t.clearcoatNormalScale.y *= -1)),
          this.cache.add(e, t),
          this.associations.set(t, this.associations.get(n))),
          (n = t);
      }
      n.aoMap &&
        void 0 === t.attributes.uv2 &&
        void 0 !== t.attributes.uv &&
        t.setAttribute("uv2", t.attributes.uv),
        (e.material = n);
    }
    getMaterialType() {
      return s.MeshStandardMaterial;
    }
    loadMaterial(e) {
      const t = this,
        n = this.json,
        r = this.extensions,
        a = n.materials[e];
      let i;
      const l = {},
        c = a.extensions || {},
        u = [];
      if (c[o.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS]) {
        const e = r[o.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS];
        (i = e.getMaterialType()), u.push(e.extendParams(l, a, t));
      } else if (c[o.KHR_MATERIALS_UNLIT]) {
        const e = r[o.KHR_MATERIALS_UNLIT];
        (i = e.getMaterialType()), u.push(e.extendParams(l, a, t));
      } else {
        const n = a.pbrMetallicRoughness || {};
        if (
          ((l.color = new s.Color(1, 1, 1)),
          (l.opacity = 1),
          Array.isArray(n.baseColorFactor))
        ) {
          const e = n.baseColorFactor;
          l.color.fromArray(e), (l.opacity = e[3]);
        }
        void 0 !== n.baseColorTexture &&
          u.push(t.assignTexture(l, "map", n.baseColorTexture)),
          (l.metalness = void 0 !== n.metallicFactor ? n.metallicFactor : 1),
          (l.roughness = void 0 !== n.roughnessFactor ? n.roughnessFactor : 1),
          void 0 !== n.metallicRoughnessTexture &&
            (u.push(
              t.assignTexture(l, "metalnessMap", n.metallicRoughnessTexture)
            ),
            u.push(
              t.assignTexture(l, "roughnessMap", n.metallicRoughnessTexture)
            )),
          (i = this._invokeOne(function(t) {
            return t.getMaterialType && t.getMaterialType(e);
          })),
          u.push(
            Promise.all(
              this._invokeAll(function(t) {
                return t.extendMaterialParams && t.extendMaterialParams(e, l);
              })
            )
          );
      }
      !0 === a.doubleSided && (l.side = s.DoubleSide);
      const h = a.alphaMode || "OPAQUE";
      return (
        "BLEND" === h
          ? ((l.transparent = !0), (l.depthWrite = !1))
          : ((l.transparent = !1),
            "MASK" === h &&
              (l.alphaTest = void 0 !== a.alphaCutoff ? a.alphaCutoff : 0.5)),
        void 0 !== a.normalTexture &&
          i !== s.MeshBasicMaterial &&
          (u.push(t.assignTexture(l, "normalMap", a.normalTexture)),
          (l.normalScale = new s.Vector2(1, -1)),
          void 0 !== a.normalTexture.scale &&
            l.normalScale.set(a.normalTexture.scale, -a.normalTexture.scale)),
        void 0 !== a.occlusionTexture &&
          i !== s.MeshBasicMaterial &&
          (u.push(t.assignTexture(l, "aoMap", a.occlusionTexture)),
          void 0 !== a.occlusionTexture.strength &&
            (l.aoMapIntensity = a.occlusionTexture.strength)),
        void 0 !== a.emissiveFactor &&
          i !== s.MeshBasicMaterial &&
          (l.emissive = new s.Color().fromArray(a.emissiveFactor)),
        void 0 !== a.emissiveTexture &&
          i !== s.MeshBasicMaterial &&
          u.push(t.assignTexture(l, "emissiveMap", a.emissiveTexture)),
        Promise.all(u).then(function() {
          let n;
          return (
            (n =
              i === T
                ? r[o.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].createMaterial(l)
                : new i(l)),
            a.name && (n.name = a.name),
            n.map && (n.map.encoding = s.sRGBEncoding),
            n.emissiveMap && (n.emissiveMap.encoding = s.sRGBEncoding),
            I(n, a),
            t.associations.set(n, { type: "materials", index: e }),
            a.extensions && L(r, n, a),
            n
          );
        })
      );
    }
    createUniqueName(e) {
      const t = s.PropertyBinding.sanitizeNodeName(e || "");
      let n = t;
      for (let e = 1; this.nodeNamesUsed[n]; ++e) n = t + "_" + e;
      return (this.nodeNamesUsed[n] = !0), n;
    }
    loadGeometries(e) {
      const t = this,
        n = this.extensions,
        r = this.primitiveCache;
      function a(e) {
        return n[o.KHR_DRACO_MESH_COMPRESSION]
          .decodePrimitive(e, t)
          .then(function(s) {
            return H(s, e, t);
          });
      }
      const i = [];
      for (let n = 0, l = e.length; n < l; n++) {
        const l = e[n],
          c = C(l),
          u = r[c];
        if (u) i.push(u.promise);
        else {
          let e;
          (e =
            l.extensions && l.extensions[o.KHR_DRACO_MESH_COMPRESSION]
              ? a(l)
              : H(new s.BufferGeometry(), l, t)),
            (r[c] = { primitive: l, promise: e }),
            i.push(e);
        }
      }
      return Promise.all(i);
    }
    loadMesh(e) {
      const t = this,
        n = this.json,
        r = this.extensions,
        o = n.meshes[e],
        a = o.primitives,
        i = [];
      for (let e = 0, t = a.length; e < t; e++) {
        const t =
          void 0 === a[e].material
            ? (void 0 === (l = this.cache).DefaultMaterial &&
                (l.DefaultMaterial = new s.MeshStandardMaterial({
                  color: 16777215,
                  emissive: 0,
                  metalness: 1,
                  roughness: 1,
                  transparent: !1,
                  depthTest: !0,
                  side: s.FrontSide
                })),
              l.DefaultMaterial)
            : this.getDependency("material", a[e].material);
        i.push(t);
      }
      var l;
      return (
        i.push(t.loadGeometries(a)),
        Promise.all(i).then(function(n) {
          const i = n.slice(0, n.length - 1),
            l = n[n.length - 1],
            c = [];
          for (let n = 0, u = l.length; n < u; n++) {
            const u = l[n],
              h = a[n];
            let d;
            const p = i[n];
            if (
              4 === h.mode ||
              5 === h.mode ||
              6 === h.mode ||
              void 0 === h.mode
            )
              (d =
                !0 === o.isSkinnedMesh
                  ? new s.SkinnedMesh(u, p)
                  : new s.Mesh(u, p)),
                !0 !== d.isSkinnedMesh ||
                  d.geometry.attributes.skinWeight.normalized ||
                  d.normalizeSkinWeights(),
                5 === h.mode
                  ? (d.geometry = D(d.geometry, s.TriangleStripDrawMode))
                  : 6 === h.mode &&
                    (d.geometry = D(d.geometry, s.TriangleFanDrawMode));
            else if (1 === h.mode) d = new s.LineSegments(u, p);
            else if (3 === h.mode) d = new s.Line(u, p);
            else if (2 === h.mode) d = new s.LineLoop(u, p);
            else {
              if (0 !== h.mode)
                throw new Error(
                  "THREE.GLTFLoader: Primitive mode unsupported: " + h.mode
                );
              d = new s.Points(u, p);
            }
            Object.keys(d.geometry.morphAttributes).length > 0 && P(d, o),
              (d.name = t.createUniqueName(o.name || "mesh_" + e)),
              I(d, o),
              h.extensions && L(r, d, h),
              t.assignFinalMaterial(d),
              c.push(d);
          }
          if (1 === c.length) return c[0];
          const u = new s.Group();
          for (let e = 0, t = c.length; e < t; e++) u.add(c[e]);
          return u;
        })
      );
    }
    loadCamera(e) {
      let t;
      const n = this.json.cameras[e],
        r = n[n.type];
      if (r)
        return (
          "perspective" === n.type
            ? (t = new s.PerspectiveCamera(
                s.MathUtils.radToDeg(r.yfov),
                r.aspectRatio || 1,
                r.znear || 1,
                r.zfar || 2e6
              ))
            : "orthographic" === n.type &&
              (t = new s.OrthographicCamera(
                -r.xmag,
                r.xmag,
                r.ymag,
                -r.ymag,
                r.znear,
                r.zfar
              )),
          n.name && (t.name = this.createUniqueName(n.name)),
          I(t, n),
          Promise.resolve(t)
        );
      console.warn("THREE.GLTFLoader: Missing camera parameters.");
    }
    loadSkin(e) {
      const t = this.json.skins[e],
        s = { joints: t.joints };
      return void 0 === t.inverseBindMatrices
        ? Promise.resolve(s)
        : this.getDependency("accessor", t.inverseBindMatrices).then(function(
            e
          ) {
            return (s.inverseBindMatrices = e), s;
          });
    }
    loadAnimation(e) {
      const t = this.json.animations[e],
        n = [],
        r = [],
        o = [],
        a = [],
        i = [];
      for (let e = 0, s = t.channels.length; e < s; e++) {
        const s = t.channels[e],
          l = t.samplers[s.sampler],
          c = s.target,
          u = void 0 !== c.node ? c.node : c.id,
          h = void 0 !== t.parameters ? t.parameters[l.input] : l.input,
          d = void 0 !== t.parameters ? t.parameters[l.output] : l.output;
        n.push(this.getDependency("node", u)),
          r.push(this.getDependency("accessor", h)),
          o.push(this.getDependency("accessor", d)),
          a.push(l),
          i.push(c);
      }
      return Promise.all([
        Promise.all(n),
        Promise.all(r),
        Promise.all(o),
        Promise.all(a),
        Promise.all(i)
      ]).then(function(n) {
        const r = n[0],
          o = n[1],
          a = n[2],
          i = n[3],
          l = n[4],
          c = [];
        for (let e = 0, t = r.length; e < t; e++) {
          const t = r[e],
            n = o[e],
            u = a[e],
            h = i[e],
            d = l[e];
          if (void 0 === t) continue;
          let p;
          switch ((t.updateMatrix(), (t.matrixAutoUpdate = !0), b[d.path])) {
            case b.weights:
              p = s.NumberKeyframeTrack;
              break;
            case b.rotation:
              p = s.QuaternionKeyframeTrack;
              break;
            default:
              p = s.VectorKeyframeTrack;
          }
          const m = t.name ? t.name : t.uuid,
            f =
              void 0 !== h.interpolation
                ? _[h.interpolation]
                : s.InterpolateLinear,
            g = [];
          b[d.path] === b.weights
            ? t.traverse(function(e) {
                !0 === e.isMesh &&
                  e.morphTargetInfluences &&
                  g.push(e.name ? e.name : e.uuid);
              })
            : g.push(m);
          let T = u.array;
          if (u.normalized) {
            const e = N(T.constructor),
              t = new Float32Array(T.length);
            for (let s = 0, n = T.length; s < n; s++) t[s] = T[s] * e;
            T = t;
          }
          for (let e = 0, t = g.length; e < t; e++) {
            const t = new p(g[e] + "." + b[d.path], n.array, T, f);
            "CUBICSPLINE" === h.interpolation &&
              ((t.createInterpolant = function(e) {
                return new M(
                  this.times,
                  this.values,
                  this.getValueSize() / 3,
                  e
                );
              }),
              (t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0)),
              c.push(t);
          }
        }
        const u = t.name ? t.name : "animation_" + e;
        return new s.AnimationClip(u, void 0, c);
      });
    }
    createNodeMesh(e) {
      const t = this.json,
        s = this,
        n = t.nodes[e];
      return void 0 === n.mesh
        ? null
        : s.getDependency("mesh", n.mesh).then(function(e) {
            const t = s._getNodeRef(s.meshCache, n.mesh, e);
            return (
              void 0 !== n.weights &&
                t.traverse(function(e) {
                  if (e.isMesh)
                    for (let t = 0, s = n.weights.length; t < s; t++)
                      e.morphTargetInfluences[t] = n.weights[t];
                }),
              t
            );
          });
    }
    loadNode(e) {
      const t = this.json,
        n = this.extensions,
        r = this,
        o = t.nodes[e],
        a = o.name ? r.createUniqueName(o.name) : "";
      return (function() {
        const t = [],
          s = r._invokeOne(function(t) {
            return t.createNodeMesh && t.createNodeMesh(e);
          });
        return (
          s && t.push(s),
          void 0 !== o.camera &&
            t.push(
              r.getDependency("camera", o.camera).then(function(e) {
                return r._getNodeRef(r.cameraCache, o.camera, e);
              })
            ),
          r
            ._invokeAll(function(t) {
              return t.createNodeAttachment && t.createNodeAttachment(e);
            })
            .forEach(function(e) {
              t.push(e);
            }),
          Promise.all(t)
        );
      })().then(function(t) {
        let i;
        if (
          ((i =
            !0 === o.isBone
              ? new s.Bone()
              : t.length > 1
              ? new s.Group()
              : 1 === t.length
              ? t[0]
              : new s.Object3D()),
          i !== t[0])
        )
          for (let e = 0, s = t.length; e < s; e++) i.add(t[e]);
        if (
          (o.name && ((i.userData.name = o.name), (i.name = a)),
          I(i, o),
          o.extensions && L(n, i, o),
          void 0 !== o.matrix)
        ) {
          const e = new s.Matrix4();
          e.fromArray(o.matrix), i.applyMatrix4(e);
        } else void 0 !== o.translation && i.position.fromArray(o.translation), void 0 !== o.rotation && i.quaternion.fromArray(o.rotation), void 0 !== o.scale && i.scale.fromArray(o.scale);
        return r.associations.set(i, { type: "nodes", index: e }), i;
      });
    }
    loadScene(e) {
      const t = this.json,
        n = this.extensions,
        r = this.json.scenes[e],
        o = this,
        a = new s.Group();
      r.name && (a.name = o.createUniqueName(r.name)),
        I(a, r),
        r.extensions && L(n, a, r);
      const i = r.nodes || [],
        l = [];
      for (let e = 0, s = i.length; e < s; e++) l.push(U(i[e], a, t, o));
      return Promise.all(l).then(function() {
        return a;
      });
    }
  }
  function U(e, t, n, r) {
    const o = n.nodes[e];
    return r
      .getDependency("node", e)
      .then(function(e) {
        if (void 0 === o.skin) return e;
        let t;
        return r
          .getDependency("skin", o.skin)
          .then(function(e) {
            t = e;
            const s = [];
            for (let e = 0, n = t.joints.length; e < n; e++)
              s.push(r.getDependency("node", t.joints[e]));
            return Promise.all(s);
          })
          .then(function(n) {
            return (
              e.traverse(function(e) {
                if (!e.isMesh) return;
                const r = [],
                  o = [];
                for (let e = 0, a = n.length; e < a; e++) {
                  const a = n[e];
                  if (a) {
                    r.push(a);
                    const n = new s.Matrix4();
                    void 0 !== t.inverseBindMatrices &&
                      n.fromArray(t.inverseBindMatrices.array, 16 * e),
                      o.push(n);
                  } else
                    console.warn(
                      'THREE.GLTFLoader: Joint "%s" could not be found.',
                      t.joints[e]
                    );
                }
                e.bind(new s.Skeleton(r, o), e.matrixWorld);
              }),
              e
            );
          });
      })
      .then(function(e) {
        t.add(e);
        const s = [];
        if (o.children) {
          const t = o.children;
          for (let o = 0, a = t.length; o < a; o++) {
            const a = t[o];
            s.push(U(a, e, n, r));
          }
        }
        return Promise.all(s);
      });
  }
  function H(e, t, n) {
    const r = t.attributes,
      o = [];
    function a(t, s) {
      return n.getDependency("accessor", t).then(function(t) {
        e.setAttribute(s, t);
      });
    }
    for (const t in r) {
      const s = A[t] || t.toLowerCase();
      s in e.attributes || o.push(a(r[t], s));
    }
    if (void 0 !== t.indices && !e.index) {
      const s = n.getDependency("accessor", t.indices).then(function(t) {
        e.setIndex(t);
      });
      o.push(s);
    }
    return (
      I(e, t),
      (function(e, t, n) {
        const r = t.attributes,
          o = new s.Box3();
        if (void 0 === r.POSITION) return;
        {
          const e = n.json.accessors[r.POSITION],
            t = e.min,
            a = e.max;
          if (void 0 === t || void 0 === a)
            return void console.warn(
              "THREE.GLTFLoader: Missing min/max properties for accessor POSITION."
            );
          if (
            (o.set(
              new s.Vector3(t[0], t[1], t[2]),
              new s.Vector3(a[0], a[1], a[2])
            ),
            e.normalized)
          ) {
            const t = N(y[e.componentType]);
            o.min.multiplyScalar(t), o.max.multiplyScalar(t);
          }
        }
        const a = t.targets;
        if (void 0 !== a) {
          const e = new s.Vector3(),
            t = new s.Vector3();
          for (let s = 0, r = a.length; s < r; s++) {
            const r = a[s];
            if (void 0 !== r.POSITION) {
              const s = n.json.accessors[r.POSITION],
                o = s.min,
                a = s.max;
              if (void 0 !== o && void 0 !== a) {
                if (
                  (t.setX(Math.max(Math.abs(o[0]), Math.abs(a[0]))),
                  t.setY(Math.max(Math.abs(o[1]), Math.abs(a[1]))),
                  t.setZ(Math.max(Math.abs(o[2]), Math.abs(a[2]))),
                  s.normalized)
                ) {
                  const e = N(y[s.componentType]);
                  t.multiplyScalar(e);
                }
                e.max(t);
              } else
                console.warn(
                  "THREE.GLTFLoader: Missing min/max properties for accessor POSITION."
                );
            }
          }
          o.expandByVector(e);
        }
        e.boundingBox = o;
        const i = new s.Sphere();
        o.getCenter(i.center),
          (i.radius = o.min.distanceTo(o.max) / 2),
          (e.boundingSphere = i);
      })(e, t, n),
      Promise.all(o).then(function() {
        return void 0 !== t.targets
          ? (function(e, t, s) {
              let n = !1,
                r = !1;
              for (let e = 0, s = t.length; e < s; e++) {
                const s = t[e];
                if (
                  (void 0 !== s.POSITION && (n = !0),
                  void 0 !== s.NORMAL && (r = !0),
                  n && r)
                )
                  break;
              }
              if (!n && !r) return Promise.resolve(e);
              const o = [],
                a = [];
              for (let i = 0, l = t.length; i < l; i++) {
                const l = t[i];
                if (n) {
                  const t =
                    void 0 !== l.POSITION
                      ? s.getDependency("accessor", l.POSITION)
                      : e.attributes.position;
                  o.push(t);
                }
                if (r) {
                  const t =
                    void 0 !== l.NORMAL
                      ? s.getDependency("accessor", l.NORMAL)
                      : e.attributes.normal;
                  a.push(t);
                }
              }
              return Promise.all([Promise.all(o), Promise.all(a)]).then(
                function(t) {
                  const s = t[0],
                    o = t[1];
                  return (
                    n && (e.morphAttributes.position = s),
                    r && (e.morphAttributes.normal = o),
                    (e.morphTargetsRelative = !0),
                    e
                  );
                }
              );
            })(e, t.targets, n)
          : e;
      })
    );
  }
  function D(e, t) {
    let n = e.getIndex();
    if (null === n) {
      const t = [],
        s = e.getAttribute("position");
      if (void 0 === s)
        return (
          console.error(
            "THREE.GLTFLoader.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."
          ),
          e
        );
      for (let e = 0; e < s.count; e++) t.push(e);
      e.setIndex(t), (n = e.getIndex());
    }
    const r = n.count - 2,
      o = [];
    if (t === s.TriangleFanDrawMode)
      for (let e = 1; e <= r; e++)
        o.push(n.getX(0)), o.push(n.getX(e)), o.push(n.getX(e + 1));
    else
      for (let e = 0; e < r; e++)
        e % 2 == 0
          ? (o.push(n.getX(e)), o.push(n.getX(e + 1)), o.push(n.getX(e + 2)))
          : (o.push(n.getX(e + 2)), o.push(n.getX(e + 1)), o.push(n.getX(e)));
    o.length / 3 !== r &&
      console.error(
        "THREE.GLTFLoader.toTrianglesDrawMode(): Unable to generate correct amount of triangles."
      );
    const a = e.clone();
    return a.setIndex(o), a;
  }
  class k {
    constructor({
      anchor: e = { lat: 0, lng: 0, altitude: 0 },
      rotation: t = new Float32Array([0, 0, 0]),
      scale: n = new Float32Array([1, 1, 1]),
      scene: r = new s.Scene(),
      map: o
    }) {
      (this.overlay = new google.maps.WebglOverlayView()),
        (this.renderer = null),
        (this.camera = null),
        (this.anchor = e),
        (this.rotation = t),
        (this.scale = n),
        (this.scene = r),
        (this.scene.rotation.x = Math.PI / 2),
        (this.overlay.onAdd = this.onAdd.bind(this)),
        (this.overlay.onRemove = this.onRemove.bind(this)),
        (this.overlay.onContextLost = this.onContextLost.bind(this)),
        (this.overlay.onContextRestored = this.onContextRestored.bind(this)),
        (this.overlay.onDraw = this.onDraw.bind(this)),
        (this.camera = new s.PerspectiveCamera()),
        o && this.setMap(o);
    }
    onAdd() {}
    onRemove() {}
    getMap() {
      return this.overlay.getMap();
    }
    requestRedraw() {
      this.overlay.requestRedraw();
    }
    setMap(e) {
      this.overlay.setMap(e);
    }
    addListener(e, t) {
      return this.overlay.addListener(e, t);
    }
    bindTo(e, t, s, n) {
      this.overlay.bindTo(e, t, s, n);
    }
    get(e) {
      return this.overlay.get(e);
    }
    notify(e) {
      this.overlay.notify(e);
    }
    set(e, t) {
      this.overlay.set(e, t);
    }
    setValues(e) {
      this.overlay.setValues(e);
    }
    unbind(e) {
      this.overlay.unbind(e);
    }
    unbindAll() {
      this.overlay.unbindAll();
    }
    onContextRestored(e) {
      (this.renderer = new s.WebGLRenderer(
        Object.assign(
          { canvas: e.canvas, context: e },
          e.getContextAttributes()
        )
      )),
        (this.renderer.autoClear = !1),
        (this.renderer.autoClearDepth = !1),
        (this.renderer.shadowMap.enabled = !0),
        (this.renderer.shadowMap.type = s.PCFSoftShadowMap),
        (this.renderer.outputEncoding = s.sRGBEncoding);
      const { width: t, height: n, clientWidth: r } = e.canvas;
      this.renderer.setPixelRatio(t / r), this.renderer.setSize(t, n, !1);
    }
    onContextLost() {
      this.renderer && (this.renderer.dispose(), (this.renderer = null));
    }
    onDraw(e, t) {
      const { lat: s, lng: n, altitude: r } = this.anchor;
      this.camera.projectionMatrix.fromArray(
        t.fromLatLngAltitude({ lat: s, lng: n }, r, this.rotation, this.scale)
      ),
        e.disable(e.SCISSOR_TEST),
        this.requestRedraw(),
        this.renderer.render(this.scene, this.camera),
        this.renderer.resetState();
    }
  }
  let B;
  Math.PI;
  const G = {
    tilt: 0,
    heading: 0,
    zoom: 18,
    center: { lat: 35.6594945, lng: 139.6999859 },
    mapId: "15431d2b469f209e",
    disableDefaultUI: false,//!0,
    //gestureHandling: "none",
    //keyboardShortcuts: !1
  };
  function j() {
    const e = document.getElementById("map");
    B = new google.maps.Map(e, G);
    const t = new s.Scene(),
      r = new s.AmbientLight(16777215, 0.75);
    t.add(r);
    const o = new s.DirectionalLight(16777215, 0.25);
    o.position.set(0, 10, 50),
      t.add(o),
      new n().load(
        "https://raw.githubusercontent.com/googlemaps/js-samples/master/assets/pin.gltf",
        e => {
          e.scene.scale.set(10, 10, 10),
            (e.scene.rotation.x = Math.PI / 2),
            t.add(e.scene);
          let { tilt: s, heading: n, zoom: r } = G;
          const o = () => {
            if (s < 67.5) s += 0.5;
            else {
              if (!(n <= 360)) return;
              (n += 0.2), (r -= 5e-4);
            }
            B.moveCamera({ tilt: s, heading: n, zoom: r }),
              requestAnimationFrame(o);
          };
          requestAnimationFrame(o);
        }
      ),
      new k({ map: B, scene: t, anchor: { ...G.center, altitude: 100 } });
  }
  var K = window;
  for (var V in t) K[V] = t[V];
  t.__esModule && Object.defineProperty(K, "__esModule", { value: !0 });
})();
