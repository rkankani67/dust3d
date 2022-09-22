#version 330
uniform vec3 eyePosition;
uniform samplerCube environmentIrradianceMapId;
uniform samplerCube environmentSpecularMapId;
in vec3 pointPosition;
in vec3 pointNormal;
in vec3 pointColor;
in float pointAlpha;
in float pointMetalness;
in float pointRoughness;
out vec4 fragColor;

const float PI = 3.1415926;

vec3 fresnelFactor(const vec3 f0, float u)
{
    return mix(f0, vec3(1.0), pow(1.01 - u, 5.0));
}

void main()
{
    vec3 n = pointNormal;
    vec3 v = normalize(eyePosition - pointPosition);
    vec3 r = reflect(-v, n);

    vec3 diffuseColor = (1.0 - pointMetalness) * pointColor;

    float NoV = abs(dot(n, v)) + 1e-5;

    vec3 specular = mix(vec3(0.04), vec3(1.0), pointMetalness);

    vec3 irradiance = texture(environmentIrradianceMapId, r).rgb;
    vec3 diffuse = irradiance * diffuseColor / PI;

    vec3 reflected = fresnelFactor(specular, NoV) * texture(environmentSpecularMapId, r, 1.0).rgb;

    vec3 color = diffuse + reflected * pointMetalness;

    color = pow(color, vec3(1.0/2.2));

    fragColor = vec4(color, pointAlpha);
}