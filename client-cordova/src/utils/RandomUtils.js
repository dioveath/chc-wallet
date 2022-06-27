var m_w = 123456789;
var m_z = 987654321;
var mask = 0xffffffff;

function seededRandom(seed) {
    m_w = (123456789 + seed) & mask;
    m_z = (987654321 - seed) & mask;  
    m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
    m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
    var result = ((m_z << 16) + (m_w & 65535)) >>> 0;
    result /= 4294967296;
    return result;
}

export { seededRandom };
